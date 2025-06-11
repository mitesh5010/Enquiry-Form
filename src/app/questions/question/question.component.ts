import { Component, Input, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Question } from './question.model';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  @Input({ required: true }) question!: Question;

  answerType = signal('short-answer');
  multipleChoiceOptions = signal<string[]>([]);
  answer = signal<string | string[]>('');
  isRequired = signal<boolean>(false);

  ngOnInit(): void {
    if (this.question) {
      this.answerType.set(this.question.type);
      this.multipleChoiceOptions.set(this.question.options ?? []);
      this.isRequired.set(this.question.required ?? false);
    }
  }

  // multipleChoiceOptions: string[] = ['Option 1', 'Option 2'];
  // checkboxOptions: string[] = ['Option 1', 'Option 2'];


  updateAnswerType(event: Event): void {
    const newType  = (event.target as HTMLSelectElement).value as Question['type'];
    this.answerType.set(newType );
    this.question.type = newType ;

    if (newType  === 'multiChoice' || newType  === 'checkbox') {
      this.question.options = [];
      this.question.answer = '';
      this.multipleChoiceOptions.set([]);
    } else {
      this.question.answer = '';
      this.question.options = [];
    }
  }

  updateText(event: Event): void {
    this.question.text = (event.target as HTMLInputElement).value;
  }

  updateAnswer(event: Event): void {
    this.question.answer = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }
  

  // addMultipleChoiceOption(): void {
  //   if (!this.question.options) this.question.options = [];
  //   this.multipleChoiceOptions.push(`Option ${this.multipleChoiceOptions.length + 1}`);
  // }

  // addCheckboxOption(): void {
  //   if (!this.question.options) this.question.options = [];
  //   this.checkboxOptions.push(`Option ${this.checkboxOptions.length + 1}`);
  // }
  addOption(): void {
    const updated = [...this.multipleChoiceOptions(), `Option ${this.multipleChoiceOptions().length + 1}`];
    this.multipleChoiceOptions.set(updated);
    this.question.options = updated;
  }

  onOptionInput(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  this.updateOption(index, value);
}

  updateOption(index: number, value: string): void {
    const updated = [...this.multipleChoiceOptions()];
    updated[index] = value;
    this.multipleChoiceOptions.set(updated);
    this.question.options = updated;
  }

  toggleRequired(event: Event): void {
     const checked = (event.target as HTMLInputElement).checked;
    this.isRequired.set(checked);
    this.question.required = checked;
  }

}
