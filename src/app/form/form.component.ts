import { Component, OnInit, signal } from '@angular/core';
import { FormService } from './form.service';
import {  FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { QuestionComponent } from "../questions/question/question.component";
import { FormData, Question } from '../questions/question/question.model';
import { FormApiService } from './form-api.service';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';

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
  formId!:number;


  constructor(public formService: FormService,
    private formApi: FormApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
 
  ngOnInit(): void { 
    this.formId = this.route.snapshot.params['id'];
    if (this.formId) {
      this.formApi.getForm(this.formId).subscribe( form =>{
        this.formService.formTitle.set(form.formTitle);
      this.formService.title.set(form.title);
      this.formService.description.set(form.description);
      this.formService.questions.set(form.questions);
      })
    }
  }

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

    if (this.formId) {
      this.formApi.updateForm(this.formId, formData).subscribe({
        next: res => {
          alert('Form updated!!!');
          this.router.navigate(['/forms/view', this.formId])
        },
        error: err => console.log('updated error:', err),
      }); 
    } else {
      
      this.formApi.createForm(formData).subscribe({
        next: res =>{
          console.log('Form Submitted:', res);
          this.formService.resetForm();
          this.router.navigate(['/forms/view',res.id])
        } ,
        error: err => console.log('Error!!',err),     
        
      })
    }
  }
}
