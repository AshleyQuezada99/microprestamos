import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-agregar-pago',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-pago.component.html',
  styleUrl: './agregar-pago.component.css'
})
export class AgregarPagoComponent implements OnInit {
  title = "Agregar un nuevo pago";
  pagoForm: FormGroup = new FormGroup({});
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.maxLength(11)]],
      periodoPago: ['', [Validators.required, Validators.maxLength(150)]],
      fechaPago: ['', [Validators.required]],
      enTiempo: [''],
      prestamoId: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    //Validamos el campo enTiempo
    if (!this.pagoForm.value.enTiempo) {
      this.pagoForm.patchValue({
        enTiempo: false
      });
    }
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
    return this.http.post<any>('http://localhost:5172/api/pago', this.pagoForm.value).pipe(
      map((response: any) => {
        this.showAlertMessage('success', 'El pago se ha agregado correctamente.');
        setTimeout(() => {
          //this.router.navigate(['/prestamos']);
        }, 2000);
        return response;
      }),
      catchError((error: any) => {
        console.error('Error al enviar la solicitud:', error);
        this.showAlertMessage('danger', 'Ha ocurrido un error al agregar el pago. Por favor, inténtelo de nuevo.');
        return of(null);
      })
    );
  }

  showAlertMessage(type: string, message: string): void {
    console.log("alerta hola");
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
