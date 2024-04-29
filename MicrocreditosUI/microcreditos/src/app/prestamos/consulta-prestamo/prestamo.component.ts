import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, delay } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-prestamo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent implements OnInit {
  title = "Historial de prestamos";
  prestamos: any;
  expandedRows: { [key: number]: boolean } = {};
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos(): void {
    this.http.get('http://localhost:5172/api/prestamo').subscribe({
      next: (response: any) => {
        this.prestamos = response;
      },
      error: error => console.log(error),
      complete: () => { }
    });
  }

  toggleRow(prestamo: any): void {
    this.expandedRows[prestamo.id] = !this.expandedRows[prestamo.id];
    if (this.expandedRows[prestamo.id] && !prestamo.pagos) {
      this.mostrarPagos(prestamo);
    }
  }

  mostrarPagos(prestamo: any): void {
    this.http.get(`http://localhost:5172/api/pago/ByPrestamo/${prestamo.id}`).subscribe({
      next: (response: any) => {
        prestamo.pagos = response;
      },
      error: error => console.log(error),
      complete: () => { }
    });
  }


  calcularMontoDebe(mesesPrestamo: any, intereses: any): number {
    const cantidadMesesDebe = mesesPrestamo;
    const interesesPorMes = intereses;
    return cantidadMesesDebe * interesesPorMes;
  }


  calcularMontoPagado(prestamo: any): number {
    let montoPagado = 0;
    if (prestamo.pagos && prestamo.pagos.length > 0) {
      prestamo.pagos.forEach((pago: any) => {
        if (pago.prestamoId === prestamo.id) {
          montoPagado += pago.monto;
        }
      });
    }

    return montoPagado;
  }

  calcularMontoFinal(prestamo: any): number {
    const montoFinal = prestamo.cantidadPrestada * (1 + prestamo.intereses);
    return montoFinal;
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este prestamo?')) {
      this.deletePrestamo$(id).subscribe({
        next: () => {
          this.showAlertMessage('success', 'El prestamo se ha eliminado correctamente.');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          console.error('Error al eliminar el prestamo:', error);
          this.showAlertMessage('danger', 'Ha ocurrido un error al eliminar el prestamo. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }

  deletePrestamo$(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:5172/api/prestamo/${id}`).pipe(
      delay(1000),
      catchError((error: any) => {
        console.error('Error al enviar la solicitud:', error);
        this.showAlertMessage('danger', 'Ha ocurrido un error al eliminar el prestamo. Por favor, inténtelo de nuevo.');
        return of(null);
      })
    );
  }

  actualizar(prestamoId: number): void {
    this.router.navigate(['/actualizarPrestamos', prestamoId]);
  }

  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
