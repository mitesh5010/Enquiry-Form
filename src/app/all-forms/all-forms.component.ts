import { Component, OnInit } from '@angular/core';
import { FormApiService } from '../form/form-api.service';
import { Form } from './forms.model'

@Component({
  selector: 'app-all-fomrs',
  imports: [],
  templateUrl: './all-forms.component.html',
  styleUrl: './all-forms.component.css'
})
export class AllFormsComponent implements OnInit {
  forms: Form[]=[];
  isLoading = true;

  constructor(private formApiService: FormApiService){}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(){
    this.formApiService.getForms().subscribe({
      next: data => {
        this.forms = data,
        this.isLoading = false,
        console.log(this.forms);
      },
      error: err => {
        console.log('errors!',err);
        this.isLoading = false
        
      }
    })
  }

}
