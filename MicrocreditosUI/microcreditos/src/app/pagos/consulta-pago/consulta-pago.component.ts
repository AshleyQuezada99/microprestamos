import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, delay, of } from 'rxjs';

@Component({
  selector: 'app-consulta-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulta-pago.component.html',
  styleUrl: './consulta-pago.component.css',
})
export class ConsultaPagoComponent implements OnInit {
  title = 'Historial de pagos';
  pagos: any;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getPagos();
  }

  getPagos(): void {
    this.http.get('http://localhost:5172/api/pago').subscribe({
      next: (response: any) => {
        this.pagos = response;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este pago?')) {
      this.deletePago$(id).subscribe({
        next: () => {
          this.showAlertMessage(
            'success',
            'El pago se ha eliminado correctamente.'
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          console.error('Error al eliminar el pago:', error);
          this.showAlertMessage(
            'danger',
            'Ha ocurrido un error al eliminar el pago. Por favor, inténtelo de nuevo.'
          );
        },
      });
    }
  }

  deletePago$(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:5172/api/pago/${id}`).pipe(
      delay(1000),
      catchError((error: any) => {
        console.error('Error al enviar la solicitud:', error);
        this.showAlertMessage(
          'danger',
          'Ha ocurrido un error al eliminar el pago. Por favor, inténtelo de nuevo.'
        );
        return of(null);
      })
    );
  }

  actualizar(pagoId: number): void {
    this.router.navigate(['/actualizarPagos', pagoId]);
  }

  showAlertMessage(type: string, message: string): void {
    console.log('alerta hola');
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
