<p-toast></p-toast>

<div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
        <!-- Logo -->
        <img 
            src="assets/layout/images/{{layoutService.config().colorScheme === 'light' ? 'logo-dark' : 'logo-white'}}.svg" 
            alt="Sakai logo" 
            class="mb-5 w-6rem flex-shrink-0"
        >
        
        <div 
            style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);">
            <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius:53px">
                
                <!-- Título -->
                <div class="text-center mb-5">
                    <div class="text-900 text-3xl font-medium mb-3">Create Account</div>
                    <span class="text-600 font-medium">Sign up to get started</span>
                </div>

                <!-- Formulario -->
                <form [formGroup]="registerForm">
                    <!-- Campo Nombre -->
                    <div class="mb-3">
                        <label for="name" class="block text-900 text-xl font-medium mb-2">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            formControlName="name" 
                            placeholder="Your Name" 
                            pInputText 
                            class="w-full md:w-30rem" 
                            style="padding:1rem"
                        >
                        <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" class="p-error mt-1">
                            <small *ngIf="registerForm.get('name')?.errors?.['required']">Name is required.</small>
                        </div>
                    </div>

                    <!-- Campo Email -->
                    <div class="mb-3">
                        <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <input 
                            id="mail" 
                            type="email" 
                            formControlName="mail" 
                            placeholder="Email address" 
                            pInputText 
                            class="w-full md:w-30rem" 
                            style="padding:1rem"
                        >
                        <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="p-error mt-1">
                            <small *ngIf="registerForm.get('email')?.errors?.['required']">Email is required.</small>
                            <small *ngIf="registerForm.get('email')?.errors?.['email']">Invalid email format.</small>
                        </div>
                    </div>

                    <!-- Campo Contraseña -->
                    <div class="mb-3">
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <p-password 
                            id="password" 
                            formControlName="password" 
                            placeholder="Password" 
                            [toggleMask]="true" 
                            styleClass="mb-2" 
                            inputStyleClass="w-full p-3 md:w-30rem"
                        ></p-password>
                        <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="p-error mt-1">
                            <small *ngIf="registerForm.get('password')?.errors?.['required']">Password is required.</small>
                            <small *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters.</small>
                        </div>
                    </div>

                    <!-- Campo Confirmar Contraseña -->
                    <div class="mb-5">
                        <label for="confirmPassword" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
                        <p-password 
                            id="confirmPassword" 
                            formControlName="confirmPassword" 
                            placeholder="Confirm Password" 
                            [toggleMask]="true" 
                            styleClass="mb-2" 
                            inputStyleClass="w-full p-3 md:w-30rem"
                        ></p-password>
                        <div *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched" class="p-error mt-1">
                            <small *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password.</small>
                            <small *ngIf="registerForm.hasError('passwordsMismatch')">Passwords do not match.</small>
                        </div>
                    </div>

                    <!-- Botón Registrar -->
                    <button 
                        pButton 
                        pRipple 
                        label="Sign Up" 
                        class="w-full p-3 text-xl" 
                        (click)="onRegister()" 
                        [disabled]="!registerForm.valid"
                    ></button>
                </form>

                <!-- Apartado "¿Ya tienes cuenta?" -->
                <div class="text-center mt-5">
                    <span class="text-600 font-medium">Already have an account?</span>
                    <a 
                        [routerLink]="['/auth/login']" 
                        class="font-medium no-underline ml-2 cursor-pointer" 
                        style="color: var(--primary-color)"
                    >Sign In</a>
                </div>
            </div>
        </div>
    </div>
</div>