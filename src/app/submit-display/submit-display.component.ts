import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormApiService } from '../form/form-api.service';

@Component({
  selector: 'app-submit-display',
  imports: [],
  templateUrl: './submit-display.component.html',
  styleUrl: './submit-display.component.css'
})
export class SubmitDisplayComponent implements OnInit{

  formTitle!:string;
  successMessage!:string;
  submitAnotherText!:string;
  formId!:number;

  constructor(private route: ActivatedRoute, private formApi: FormApiService, private router: Router) {}

  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];
    this.formApi.getForm(this.formId).subscribe( form =>{
      this.formTitle = form.formTitle;
    })
  }

  onSubmitAnother(){
    this.router.navigate(['/forms', this.formId])
  }

}
