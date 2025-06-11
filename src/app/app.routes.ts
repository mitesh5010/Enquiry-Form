import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResponsesComponent } from './responses/responses.component';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    title: 'Enquiry-Form'
  },
  {
    path:'user-form',
    component: UserFormComponent
  },
  {
    path: 'form',
    component: ResponsesComponent
  }
];
