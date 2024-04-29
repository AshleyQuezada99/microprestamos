import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-prestamo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar-prestamo.component.html',
  styleUrl: './actualizar-prestamo.component.css'
})
export class ActualizarPrestamoComponent implements OnInit {
  title = "Actualizar prestamo";
  prestamoForm: FormGroup = new FormGroup({});
  prestamoId: any;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.prestamoId = this.route.snapshot.params['id'];
    this.initForm();
    this.getPrestamo();
  }

  initForm(): void {
    this.prestamoForm = this.formBuilder.group({
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      cantidadPrestada: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      fechaPrestamo: [''],
      diaCobro: [''],
      mesesPrestamo: [''],
      intereses: ['']
    });
  }

  getPrestamo(): void {
    this.http.get<any>(`http://localhost:5172/api/prestamo/${this.prestamoId}`).subscribe(
      (response) => {
        this.prestamoForm.patchValue(response);
      },
      (error) => {
        console.error('Error al obtener el prestamo:', error);
        this.showAlertMessage('danger', 'Error al obtener el prestamo.');
      }
    );
  }

  onSubmit(): void {
    this.http.put(`http://localhost:5172/api/prestamo/${this.prestamoId}`, this.prestamoForm.value).subscribe(
      (response) => {
        console.log("hola" + response);
        this.showAlertMessage('success', 'Prestamo actualizado correctamente.');
        setTimeout(() => {
          this.router.navigate(['/prestamos']);
        }, 2000);
      },
      (error) => {
        console.log(this.prestamoForm.value);
        console.error('Error al actualizar el prestamo:', error);
        this.showAlertMessage('danger', 'Error al actualizar el prestamo.');
      }
    );
  }

  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
