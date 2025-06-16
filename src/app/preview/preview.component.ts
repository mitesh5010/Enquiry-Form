import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../form/form.service';

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
    private formApiService: FormApiService,
    private route: ActivatedRoute,
    private formService: FormService
  ){}

  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];

    this.formApiService.getForm(this.formId).subscribe((data) => {
    this.form = this.formService.buildForm(data);
    })
  }
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  getOptions(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
  }

}
