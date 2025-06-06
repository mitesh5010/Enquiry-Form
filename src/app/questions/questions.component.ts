import { Component } from '@angular/core';
import { QuestionComponent } from "./question/question.component";

@Component({
  selector: 'app-questions',
  imports: [QuestionComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

}
