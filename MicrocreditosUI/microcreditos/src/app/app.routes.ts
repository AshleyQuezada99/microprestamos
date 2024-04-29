import { Routes } from '@angular/router';
import { PrestamoComponent } from './prestamos/consulta-prestamo/prestamo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { AgregarPrestamoComponent } from './prestamos/agregar-prestamo/agregar-prestamo.component';
import { ActualizarPrestamoComponent } from './prestamos/actualizar-prestamo/actualizar-prestamo.component';
import { AgregarPagoComponent } from './pagos/agregar-pago/agregar-pago.component';
import { ConsultaPagoComponent } from './pagos/consulta-pago/consulta-pago.component';
import { ActualizarPagoComponent } from './pagos/actualizar-pago/actualizar-pago.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'prestamos', component: PrestamoComponent },
    { path: 'agregarPrestamos', component: AgregarPrestamoComponent },
    { path: 'actualizarPrestamos/:id', component: ActualizarPrestamoComponent },
    { path: 'agregarPagos', component: AgregarPagoComponent },
    { path: 'pagos', component: ConsultaPagoComponent },
    { path: 'actualizarPagos/:id', component: ActualizarPagoComponent },
];
