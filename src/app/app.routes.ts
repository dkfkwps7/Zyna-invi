import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AdminComponent } from './admin/admin';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent }
];
