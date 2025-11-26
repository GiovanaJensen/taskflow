import { Routes } from '@angular/router';
import { AuthComponent } from './module/Auth/pages/auth/auth.component';
import { HomeComponent } from './module/Home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent 
  },
  {
    path: '',
    component: HomeComponent
  }
];
