import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../../admin/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordsMatch });

  private token: string = '';
  loading: boolean = false;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Obtener el token de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token inválido o no proporcionado.' });
        this.router.navigate(['/auth/login']);
      }
    });
  }

  passwordsMatch(control: AbstractControl): null | object {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.loading = true;
      const { newPassword } = this.resetPasswordForm.value;
      const data = {
        newPassword,
        token: this.token
      };
      this.authService.resetPassword(data).subscribe(
        (res) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.loading = false;
          const errorMessage = error.status === 400 ? 'Invalid token or password mismatch' : 'Unexpected error occurred';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        }
      );
    } else {
      this.resetPasswordForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Formulario inválido', detail: 'Por favor, complete todos los campos correctamente.' });
    }
  }
}