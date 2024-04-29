import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-prestamo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-prestamo.component.html',
  styleUrls: ['./agregar-prestamo.component.css'],
})
export class AgregarPrestamoComponent implements OnInit {
  title = 'Agregar un nuevo prestamo';
  prestamoForm: FormGroup = new FormGroup({});
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.prestamoForm = this.fb.group({
      ci: ['', [Validators.required, Validators.maxLength(11)]],
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
      cantidadPrestada: [
        '',
        [Validators.required, Validators.pattern(/^\d{1,6}(\.\d{1,2})?$/)],
      ],
      telefono: ['', Validators.pattern(/^\d{10}$/)],
      email: ['', [Validators.required, Validators.email]],
      fechaPrestamo: [''],
      diaCobro: [''],
      mesesPrestamo: [''],
      intereses: [''],
    });
  }
  onSubmit(): void {
    this.onSubmit$().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
      }
    );
  }

  onSubmit$(): Observable<any> {
    return this.http
      .post<any>('http://localhost:5172/api/prestamo', this.prestamoForm.value)
      .pipe(
        map((response: any) => {
          this.showAlertMessage(
            'success',
            'El prestamo se ha agregado correctamente.'
          );
          setTimeout(() => {
            this.router.navigate(['/prestamos']);
          }, 2000);
          return response;
        }),
        catchError((error: any) => {
          console.error('Error al enviar la solicitud:', error);
          this.showAlertMessage(
            'danger',
            'Ha ocurrido un error al agregar el prestamo. Por favor, inténtelo de nuevo.'
          );
          return of(null);
        })
      );
  }

  showAlertMessage(type: string, message: string): void {
    console.log('alerta hola');
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
