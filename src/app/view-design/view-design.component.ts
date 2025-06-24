import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../form/form.service';
import { QuestionAnswer } from '../responses/responses.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-design',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view-design.component.html',
  styleUrl: './view-design.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class ViewDesignComponent {
  form!: FormGroup;
  formId!: number;
  shareUrl!: string;
  @Input() responseData?: QuestionAnswer[]; 

  constructor(
    private formApiService: FormApiService,
    private route: ActivatedRoute,
    private formService: FormService,
  ){}

  ngOnInit(): void {
    // this.formId = +this.route.snapshot.params['id'];
    this.formId = +this.route.parent?.snapshot.params['id']

    this.formApiService.getForm(this.formId).subscribe((data) => {
    this.form = this.formService.buildForm(data);    
    })

    this.shareUrl = `${window.location.origin}/forms/${this.formId}` 
  }
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  getOptions(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
  }

  getAnswer(questionId: string, type?: string){
    if (!this.responseData) return null;
    const answer = this.responseData.find(q => q.qId === questionId)
    let value= answer?.answer || answer?.selectedOpt || null;
     if (type === 'date' && value) {
    // Ensure value is in YYYY-MM-DD format
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    // Try to parse as Date
    const date = new Date(String(value));
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
    return '';
  }
  if (type === 'time' && value) {
    // Ensure value is in HH:mm format
    if (typeof value === 'string' && /^\d{2}:\d{2}$/.test(value)) {
      return value;
    }
    // If value is like "01:00:00", trim to "01:00"
    if (typeof value === 'string' && value.length >= 5) {
      return value.slice(0, 5);
    }
    return '';
  }
  return value;
  }

  isOptionSelected(questionIndex: number, optionValue: string){
    const questionId = this.questions.at(questionIndex).value.id;
    const answer = this.getAnswer(questionId);

    if (!answer) return false;
    if (Array.isArray(answer)) {
      return answer.includes(optionValue);
    }
    return answer === optionValue;
  }
}
