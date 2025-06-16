import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { QuestionAnswer } from '../responses/responses.model';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../form/form.service';

@Component({
  selector: 'app-user-form',
  imports: [ ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  formId!:number;
  
  constructor(private fb: FormBuilder, private formApiService: FormApiService, private route: ActivatedRoute,
    private formService: FormService
  ){}
  
  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];
     this.formApiService.getForm(this.formId).subscribe((data)=>{
      this.form = this.formService.buildForm(data);
     })
     
    }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  getOptions(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
  }
  onOptionChange(event: any, qIndex: number, value: string) {
  const question = this.questions.at(qIndex);
  let currentAnswers = question.get('answer')?.value || [];
  if (event.target.checked) {
    currentAnswers.push(value);
  } else {
    currentAnswers = currentAnswers.filter((v: string) => v !== value);
  }
  question.get('answer')?.setValue(currentAnswers);
}

  onSubmit() {
    console.log(this.form.value);
    const questionAnswer: QuestionAnswer[] = this.questions.controls.map((q: AbstractControl) => {
      const type = q.value.type;
      const qId = q.value.id;
      if (type === 'multiChoice' || type === 'checkbox') {
        return {
          qId,
          selectedOpt: q.value.answer ?? []
        } as QuestionAnswer;
      } else {
        return {
          qId,
          answer: q.value.answer ?? ''
        } as QuestionAnswer;
      }
    })
    const responseData = {
      formId : this.formId,
      response: [
        {
          rId: Date.now(),
          questionAnswer
        }
      ]
    };

    this.formApiService.postResponse(responseData).subscribe({
      next : res=> console.log('submitted',res),
      error: err => console.log('error',err)
      
    })

  }


}
