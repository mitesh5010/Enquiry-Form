import { Routes } from '@angular/router';
import {  AllFormsComponent } from './all-forms/all-forms.component';
import { FormComponent } from './form/form.component';
import { ResponsesComponent } from './responses/responses.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PreviewComponent } from './preview/preview.component';
import { ViewsComponent } from './views/views.component';
import { Component } from '@angular/core';
import { ViewDesignComponent } from './view-design/view-design.component';

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
    path:'forms/:id/edit',
    component: FormComponent,
    title: 'Edit Form'
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
    ]
  },
  
  {
    path:'**',
    redirectTo:''
  },
];
