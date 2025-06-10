import { Component, signal } from '@angular/core';
import { FormTitleComponent } from "../form-title/form-title.component";
import { FormService } from './form.service';
import {  FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { QuestionComponent } from "../questions/question/question.component";
import { Question } from '../questions/question/question.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormTitleComponent, FormsModule, QuestionComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private id = 1;

  constructor(public formService: FormService) {}
 

  addQuestion() {
    const id = this.id++;
    const newQuestion: Question = {
    id,
    text: '',
    type: 'short-answer',
    answer: '',
    required: false,
    };
    this.formService.questions.update(qs => [...qs, newQuestion]);
  }

  onPublish() {
    console.log({
      formTitle:this.formService.formTitle().trim(),
      title: this.formService.title().trim(),
      description: this.formService.description().trim(),
      questions: this.formService.questions(),
    }
    );
  }

}
