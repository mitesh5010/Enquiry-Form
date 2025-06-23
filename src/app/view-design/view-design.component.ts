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

  getAnswer(questionId: string){
    if (!this.responseData) return null;
    const answer = this.responseData.find(q => q.qId === questionId)
    return answer?.answer || answer?.selectedOpt || null;
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
