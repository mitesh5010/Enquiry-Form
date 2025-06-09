import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  answerType = signal('short-answer');

  multipleChoiceOptions: string[] = ['Option 1', 'Option 2'];
  checkboxOptions: string[] = ['Option 1', 'Option 2'];

  updateAnswerType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.answerType.set(target.value);
  }

  addMultipleChoiceOption(): void {
    this.multipleChoiceOptions.push(`Option ${this.multipleChoiceOptions.length + 1}`);
  }

  addCheckboxOption(): void {
    this.checkboxOptions.push(`Option ${this.checkboxOptions.length + 1}`);
  }

}
