import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, delay, switchMap } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-prestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css',
})
export class PrestamoComponent implements OnInit {
  title = 'Historial de prestamos';
  prestamos: any;
  expandedRows: { [key: number]: boolean } = {};
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';
  prestamoss: any[] = [];
  filtroTabla: string = '';
  statusFinal: string = '';
  statusMessageAlert: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getPrestamos();
  }

  cumpleFiltro(prestamo: any): boolean {
    if (!this.filtroTabla) {
      return true;
    }
    const filtro = this.filtroTabla.toLowerCase();
    for (const key in prestamo) {
      if (Object.prototype.hasOwnProperty.call(prestamo, key)) {
        const value = prestamo[key];
        if (
          value &&
          typeof value === 'string' &&
          value.toLowerCase().includes(filtro)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  getPrestamos(): void {
    this.http.get('http://localhost:5172/api/prestamo').subscribe({
      next: (response: any) => {
        this.prestamos = response;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  toggleRow(prestamo: any): void {
    this.expandedRows[prestamo.id] = !this.expandedRows[prestamo.id];
    if (this.expandedRows[prestamo.id] && !prestamo.pagos) {
      this.mostrarPagos(prestamo);
    }
  }

  mostrarPagos(prestamo: any): void {
    this.http
      .get(`http://localhost:5172/api/pago/ByPrestamo/${prestamo.id}`)
      .subscribe({
        next: (response: any) => {
          prestamo.pagos = response;
        },
        error: (error) => console.log(error),
        complete: () => {},
      });
  }

  calcularMontoDebe(
    mesesPrestamo: any,
    intereses: any,
    cantidadPrestada: any
  ): number {
    const cantidadMesesDebe = mesesPrestamo;
    const interesesPorMes = intereses / 100;
    const total = cantidadPrestada + cantidadMesesDebe * interesesPorMes;
    return Number(total.toFixed(2));
  }

  calcularMontoPagado(prestamo: any): number {
    let montoPagado = 0;
    let montoPagadoFinal = 0;
    const interesDecimal = prestamo.intereses / 100;
    const interesTotal = interesDecimal * prestamo.mesesPrestamo;

    if (prestamo.pagos && prestamo.pagos.length > 0) {
      prestamo.pagos.forEach((pago: any) => {
        if (pago.prestamoId === prestamo.id) {
          montoPagado += pago.monto;
        }
      });
    }
    montoPagadoFinal = montoPagado + interesTotal;
    return Number(montoPagadoFinal.toFixed(2));
  }

  calcularMontoFinal(prestamo: any): number {
    const interesDecimal = prestamo.intereses / 100;
    const interesTotal = interesDecimal * prestamo.mesesPrestamo;
    const montoFinal = prestamo.cantidadPrestada + interesTotal;
    return montoFinal;
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este prestamo?')) {
      this.deletePrestamo$(id).subscribe({
        next: () => {
          this.showAlertMessage(
            'success',
            'El prestamo se ha eliminado correctamente.'
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          console.error('Error al eliminar el prestamo:', error);
          this.showAlertMessage(
            'danger',
            'Ha ocurrido un error al eliminar el prestamo. Por favor, inténtelo de nuevo.'
          );
        },
      });
    }
  }

  deletePrestamo$(id: number): Observable<any> {
    return this.http
      .delete<any>(`http://localhost:5172/api/prestamo/${id}`)
      .pipe(
        delay(1000),
        catchError((error: any) => {
          console.error('Error al enviar la solicitud:', error);
          this.showAlertMessage(
            'danger',
            'Ha ocurrido un error al eliminar el prestamo. Por favor, inténtelo de nuevo.'
          );
          return of(null);
        })
      );
  }

  actualizar(prestamoId: number): void {
    this.router.navigate(['/actualizarPrestamos', prestamoId]);
  }

  actualizarStatusPago(id: number, statusValue: boolean): void {
    // Validar el valor del status según
    if (statusValue == true) {
      this.statusFinal = 'cancelar';
      this.statusMessageAlert = 'cancelado';
      statusValue = false;
    } else {
      this.statusFinal = 'realizar';
      this.statusFinal = 'realizado';
      statusValue = true;
    }
    console.log(statusValue);

    if (confirm(`¿Estás seguro de que deseas ${this.statusFinal} este pago?`)) {
      this.http
        .patch<any>(`http://localhost:5172/api/pago/update-status/${id}`, {
          status: !!statusValue,
        })
        .pipe(
          delay(100000),
          catchError((error: any) => {
            console.error('Error al enviar la solicitud:', error);
            this.showAlertMessage(
              'danger',
              `Ha ocurrido un error al ${this.statusFinal} el pago. Por favor, inténtelo de nuevo.`
            );
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            this.showAlertMessage(
              'success',
              `El pago se ha ${this.statusFinal} correctamente.`
            );
            setTimeout(() => {
              window.location.reload();
            }, 200000);
          },
        });
    }
  }

  showAlertMessage(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }
}
