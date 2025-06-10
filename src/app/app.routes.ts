import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResponsesComponent } from './responses/responses.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    title: 'Enquiry-Form'
  },
  {
    path: 'responses',
    component: ResponsesComponent
  }
];
