import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { FormData } from '../questions/question/question.model';
import { QuestionAnswer } from '../responses/responses.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  formId!:number;
  
  constructor(private fb: FormBuilder, private http: FormApiService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];
     this.http.getForm(this.formId).subscribe((data)=>{
      this.buildForm(data);
     })
     
    }
  buildForm(data: FormData){
    this.form = this.fb.group({
      formTitle : [data.formTitle],
      title: [data.title],
      description: [data.description],
      questions: this.fb.array(
        data.questions.map(q=>
          this.questionGroup(q)
        )
      )
    })
  }

  questionGroup(q: any): FormGroup {
    return this.fb.group({
      id: [q.id],
      text: [q.text],
      type: [q.type],
      required: [q.required],
      answer: [q.answer],
      options: this.fb.array((q.options??[]).map((opt:any) => this.fb.control(opt)))
    });
  }

  get formID():number{
    this.formId = this.form.value.id;
    return this.formId;
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

    this.http.postResponse(responseData).subscribe({
      next : res=> console.log('submitted',res),
      error: err => console.log('error',err)
      
    })

  }


}
