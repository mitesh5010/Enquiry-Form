import { Routes } from '@angular/router';
import {  AllFormsComponent } from './all-forms/all-forms.component';
import { FormComponent } from './form/form.component';
import { ResponsesComponent } from './responses/responses.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PreviewComponent } from './preview/preview.component';
import { ViewsComponent } from './views/views.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './Auth/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Form'
  },
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'forms',
    component: AllFormsComponent,
    title: 'Enquiry-Form',
    canActivate: [AdminGuard]
  },
  {
    path: 'forms/newForm',
    component: FormComponent,
    title: 'New Form',
    canActivate: [AdminGuard]
  },
  {
    path:'forms/:id/edit',
    component: FormComponent,
    title: 'Edit Form',
    canActivate: [AdminGuard]
  },
  {
    path:'forms/:id',
    component: UserFormComponent,
  },
  {
    path:'forms/view/:id',
    component: ViewsComponent,
    children: [
      {
        path: '',
        component: PreviewComponent,
      },
      {
        path: 'responses',
        component: ResponsesComponent,
        title: 'Responses',
      },
    ],
    canActivate: [AdminGuard]
  },
  
  {
    path:'**',
    redirectTo:''
  },
];
