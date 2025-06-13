import { Routes } from '@angular/router';
import {  AllFormsComponent } from './all-forms/all-forms.component';
import { FormComponent } from './form/form.component';
import { ResponsesComponent } from './responses/responses.component';

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
    path: 'forms/newForm',
    component: FormComponent,
    title: 'New Form'
  },
  {
    path: 'forms/responses',
    component: ResponsesComponent,
    title: 'Responses',
  },
  {
    path:'**',
    redirectTo:'/forms'
  },
];
