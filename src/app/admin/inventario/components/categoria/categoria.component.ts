import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

interface Categoria {
  id: number;
  nombre: string;
  detalle: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)
  categorias: Categoria[] = [];
  visible: boolean = false;
  categoria_id: number = -1;
  categoriaForm = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  });

  ngOnInit(): void {
    this.getCategoria()
  }
  getCategoria() {
    this.categoriaService.funlistar().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  mostrarDialog() {
    this.visible = true
  }

  guardarCategoria() {
    if (this.categoriaForm.valid) {
      if (this.categoria_id !== -1) { // Si hay un ID válido, modificar
        this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value).subscribe(
          (res: any) => {
            this.visible = false;
            this.getCategoria(); // Recargar las categorías después de guardar
            this.categoria_id = -1; // Resetear el ID
            Swal.fire({
              title: "En hora buena",
              text: "La categoría se modificó con éxito!",
              icon: "success"
            });
          },
          (err: any) => {
            console.error('Error al modificar la categoría', err);
          }
        );
      } else { // Si no hay un ID válido, crear una nueva categoría
        this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
          (res: any) => {
            this.visible = false;
            this.getCategoria(); // Recargar las categorías después de guardar
            Swal.fire({
              title: "Registrado",
              text: "La categoría se creó con éxito!",
              icon: "success"
            });
          },
          (error: any) => {
            console.error('Error al crear la categoría', error);
          }
        );
      }
      this.categoriaForm.reset(); // Resetear el formulario después de guardar
    } else {
      Swal.fire({
        title: "Formulario inválido",
        text: "Por favor completa todos los campos.",
        icon: "error"
      });
    }
  }


  editarCategoria(cat: Categoria) {
    this.visible = true
    this.categoria_id = cat.id
    this.categoriaForm.setValue({ nombre: cat.nombre, detalle: cat.detalle })
  }

  eliminarCategoria(cat: Categoria) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la categoría?',
      text: 'No podrás recuperarla después de eliminarla',
      icon: 'warning',

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si.eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res: any) => {
            Swal.fire({
              title: "Eliminado",
              text: "La categoría se eliminó",
              icon: "success"
            });
            this.getCategoria();
            this.categoria_id = -1
          },
          (error: any) => {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar la categoría",
              icon: "error"
            })
          }
        )
      }
    })
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({
      title, text, icon
      //title:title,
      //text:text,
      //icon:icon
    })
  }

}