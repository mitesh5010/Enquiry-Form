import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { FormData } from '../questions/question/question.model';

@Component({
  selector: 'app-user-form',
  imports: [ ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: FormApiService){}

  ngOnInit(): void {
     this.http.getForm().subscribe((data)=>{
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

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  getOptions(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
  }

  onSubmit() {
    console.log(this.form.value);
  }


}
