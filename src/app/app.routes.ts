import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResponsesComponent } from './responses/responses.component';

export const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    title: 'Enquiry-Form'
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'responses',
    component: ResponsesComponent
  }
];
