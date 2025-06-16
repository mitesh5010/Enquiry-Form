import { Component, OnInit, signal } from '@angular/core';
import { FormService } from './form.service';
import {  FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { QuestionComponent } from "../questions/question/question.component";
import { FormData, Question } from '../questions/question/question.model';
import { FormApiService } from './form-api.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, QuestionComponent, HeaderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private id = 1;
  formData!: FormData;


  constructor(public formService: FormService,
    private formApi: FormApiService,
    private router: Router
  ) {}
 
  ngOnInit(): void { }

  addQuestion() {
    const id = this.id++;
    const newQuestion: Question = {
    id,
    text: '',
    type: 'short-answer',
    answer: '',
    required: false,
    };
    this.formService.questions.update(qs => [...qs, newQuestion]);
  }

  
  onPublish() {
    console.log({
    formTitle:this.formService.formTitle().trim(),
    title: this.formService.title().trim(),
    description: this.formService.description().trim(),
    questions: this.formService.questions(),
    }
    );

    const formData: FormData = {
      formTitle: this.formService.formTitle().trim(),
      title: this.formService.title().trim(),
      description: this.formService.description().trim(),
      questions: this.formService.questions(),
    }

    this.formApi.createForm(formData).subscribe({
      next: res =>{
        console.log('Form Submitted:', res);
        this.formService.resetForm();
        this.router.navigate(['/preview',res.id])
      } ,
      error: err => console.log('Error!!',err),     
      
    })
  }

  

}
