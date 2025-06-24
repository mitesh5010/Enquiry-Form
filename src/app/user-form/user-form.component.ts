import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { QuestionAnswer } from '../responses/responses.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../form/form.service';
import { ResponseApiService } from '../responses/response-api.service';


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
    private formService: FormService, private responseApi: ResponseApiService, private router: Router
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
   if (question.value.type === 'multiChoice') {
    question.get('answer')?.setValue(value);
  } else if (question.value.type === 'checkbox') {
  let currentAnswers = question.get('answer')?.value || [];
  if (event.target.checked) {
    currentAnswers.push(value);
  } else {
    currentAnswers = currentAnswers.filter((v: string) => v !== value);
  }
  question.get('answer')?.setValue(currentAnswers);
}
  question.get('answer')?.markAsTouched();
}

validateAllFormFields(formGroup: FormGroup | FormArray) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormGroup || control instanceof FormArray) {
      this.validateAllFormFields(control);
    } else {
      control?.markAsTouched({ onlySelf: true });
    }
  });
}

  onSubmit() {
    this.validateAllFormFields(this.form);

    if (this.form.invalid) {
    // Scroll to first invalid question
    const firstInvalidElement = document.querySelector('.ng-invalid');
    if (firstInvalidElement) {
      firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
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

    const newResponse = {
          rId: Date.now(),
          questionAnswer
        }
    const responseData = {
      formId : this.formId,
      response: [newResponse]
    };

    this.responseApi.getresponseById(this.formId).subscribe( existing =>{
      if (existing.length > 0) {
      const record = existing[0];
      const updatedResponse = [...record.response, newResponse];

      this.responseApi.updateResponse(record.id, {
        ...record,
        response: updatedResponse
      }).subscribe({
        next: res => console.log('Updated existing response:'),
        error: err => console.error('Update error:', err)
      });
    } else {
      this.responseApi.postResponse(responseData).subscribe({
         next: res => console.log('new response:'),
        error: err => console.error('error:', err)
      })
    }
    })

    this.router.navigate(['/submit', this.formId]);

  }


}
