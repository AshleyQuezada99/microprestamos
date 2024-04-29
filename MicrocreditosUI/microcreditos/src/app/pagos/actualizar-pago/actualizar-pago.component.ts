import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, delay, of } from 'rxjs';

@Component({
  selector: 'app-actualizar-pago',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar-pago.component.html',
  styleUrl: './actualizar-pago.component.css',
})
export class ActualizarPagoComponent implements OnInit {
  title = 'Actualizar pago';
  pagoForm: FormGroup = new FormGroup({});
  pagoId: any;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pagoId = this.route.snapshot.params['id'];
    this.initForm();
    this.getPago();
  }

  initForm(): void {
    this.pagoForm = this.formBuilder.group({
      monto: ['', [Validators.required, Validators.maxLength(11)]],
      periodoPago: ['', [Validators.required, Validators.maxLength(150)]],
      fechaPago: ['', [Validators.required]],
      enTiempo: [''],
      prestamoId: ['', [Validators.required]],
    });
  }

  getPago(): void {
    this.http
      .get<any>(`http://localhost:5172/api/pago/${this.pagoId}`)
      .subscribe(
        (response) => {
          this.pagoForm.patchValue(response);
        },
        (error) => {
          console.error('Error al obtener el pago:', error);
          this.showAlertMessage('danger', 'Error al obtener el pago.');
        }
      );
  }

  onSubmit(): void {
    this.http
      .put(
        `http://localhost:5172/api/pago/${this.pagoId}`,
        this.pagoForm.value,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          console.log('hola' + response);
          this.showAlertMessage('success', 'Pago actualizado correctamente.');
          setTimeout(() => {
            this.router.navigate(['/pagos']);
          }, 2000);
        },
        (error) => {
          console.log(this.pagoForm.value);
          console.error('Error al actualizar el pago:', error);
          this.showAlertMessage('danger', 'Error al actualizar el pago.');
        }
      );
  }
  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
