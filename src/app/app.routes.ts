import { Routes } from '@angular/router';
import {  AllFormsComponent } from './all-forms/all-forms.component';

export const routes: Routes = [
  {
    path: 'forms',
    component: AllFormsComponent,
    title: 'Enquiry-Form'
  },
  {
    path:'',
    redirectTo: '/forms',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'/forms'
  }
];
