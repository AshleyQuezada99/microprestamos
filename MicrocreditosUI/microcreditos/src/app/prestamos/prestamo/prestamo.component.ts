import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  pagos: any;
  totalDebe: number = 0;
  totalPagado: number = 0;
  totalFinal: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos(): void {
    this.http.get('http://localhost:5172/api/prestamo').subscribe({
      next: response => this.prestamos = response,
      error: error => console.log(error),
      complete: () => { }
    })
  }

  getPagos(): void {
    this.http.get('http://localhost:5172/api/pago').subscribe({
      next: response => this.pagos = response,
      error: error => console.log(error),
      complete: () => { }
    })
  }
}
