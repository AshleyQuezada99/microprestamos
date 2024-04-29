import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { PrestamoComponent } from './app/prestamos/consulta-prestamo/prestamo.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
