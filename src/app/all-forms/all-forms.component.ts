import { Component, OnInit } from '@angular/core';
import { FormApiService } from '../form/form-api.service';
import { Form } from './forms.model'
import {  Router, RouterModule } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-all-fomrs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-forms.component.html',
  styleUrl: './all-forms.component.css'
})
export class AllFormsComponent implements OnInit {
  forms: Form[]=[];
  isLoading = true;

  constructor(private formApiService: FormApiService, private router: Router, private auth: AuthService){}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(){
    this.formApiService.getForms().subscribe({
      next: data => {
        this.forms = data,
        this.isLoading = false;
      },
      error: err => {
        console.log('errors!',err);
        this.isLoading = false
        
      }
    })
  }

  onCreateNew(){
    this.router.navigate(['/forms/newForm']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
