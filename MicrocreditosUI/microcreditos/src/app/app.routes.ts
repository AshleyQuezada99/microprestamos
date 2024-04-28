import { Routes } from '@angular/router';
import { PrestamoComponent } from './prestamos/prestamo/prestamo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'prestamos', component: PrestamoComponent }

];
