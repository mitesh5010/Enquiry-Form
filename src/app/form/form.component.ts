import { Component, signal } from '@angular/core';
import { FormTitleComponent } from "../form-title/form-title.component";
import { QuestionsComponent } from "../questions/questions.component";
import { FormService } from './form.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormTitleComponent, QuestionsComponent, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private id = 1;

  constructor(public formService: FormService) {}

  addQuestion() {
    const id = this.id++;
    this.formService.questions.update(qs => [...qs, { id, text: '', type: 'short-answer' ,answer:'' }]);
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
