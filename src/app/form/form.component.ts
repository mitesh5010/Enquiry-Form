import { Component, signal } from '@angular/core';
import { FormTitleComponent } from "../form-title/form-title.component";
import { QuestionsComponent } from "../questions/questions.component";
import { Question } from '../questions/question/question.model';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  imports: [FormTitleComponent, QuestionsComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private id = 1;

  constructor(public formService: FormService) {}

  addQuestion() {
    const id = this.id++;
    this.formService.questions.update(qs => [...qs, { id, text: '', type: 'short-answer'  }]);
  }

}
