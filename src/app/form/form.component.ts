import { Component } from '@angular/core';
import { FormTitleComponent } from "../form-title/form-title.component";
import { QuestionsComponent } from "../questions/questions.component";

@Component({
  selector: 'app-form',
  imports: [FormTitleComponent, QuestionsComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

}
