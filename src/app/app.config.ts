import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'; // TOTO SME PRIDALI

export const appConfig: ApplicationConfig = {
  providers:[
    provideRouter(routes),
    provideHttpClient(), provideClientHydration(withEventReplay()) // TOTO SME PRIDALI
  ]
};