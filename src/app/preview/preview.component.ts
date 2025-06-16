import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { HttpClient } from '@angular/common/http';
import { Form } from '../all-forms/forms.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  imports: [ReactiveFormsModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  form!: FormGroup;
  formId!: number;

  constructor(
    private fb : FormBuilder, private formApiService: FormApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];

    this.formApiService.getForm(this.formId).subscribe((data) => {
      this.buildForm(data);
    })
  }

  buildForm(data: Form){
      this.form = this.fb.group({
        formTitle : [data.formTitle],
        title: [data.title],
        description: [data.description],
        questions: this.fb.array(
          (Array.isArray(data.questions) ? data.questions : [data.questions]).map(q =>
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

}
