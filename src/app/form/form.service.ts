import { Injectable, signal } from '@angular/core';
import { Question } from '../questions/question/question.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../all-forms/forms.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) {}

  formTitle = signal<string>('Untitle form');
  title = signal<string>('Untitle form');
  description = signal<string>('');
  questions = signal<Question[]>([]);

  resetForm() {
  this.formTitle.set('Untitle form');
  this.title.set('Untitle form');
  this.description.set('');
  this.questions.set([]);
  }

  buildForm(data: Form){
    return this.fb.group({
      formTitle : [data.formTitle],
      title: [data.title],
      description: [data.description],
      questions: this.fb.array(
        (Array.isArray(data.questions) ? data.questions : [data.questions]).map(q =>
          this.questionGroup(q)
        )
      )
    })
  }
  questionGroup(q: Question): FormGroup {
    return this.fb.group({
      id: [q.id],
      text: [q.text],
      type: [q.type],
      required: [q.required],
      answer: [q.answer],
      options: this.fb.array((q.options??[]).map((opt:any) => this.fb.control(opt)))
    });
  }


}
