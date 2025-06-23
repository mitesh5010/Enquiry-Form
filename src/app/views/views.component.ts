import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormApiService } from '../form/form-api.service';

@Component({
  selector: 'app-views',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css',
  encapsulation:ViewEncapsulation.Emulated
})
export class ViewsComponent implements OnInit {

  formId!:number;
  formTitle!:string;

  constructor(private route: ActivatedRoute,private formApi: FormApiService ){}
  ngOnInit(): void {
    this.formId= +this.route.snapshot.params['id'];
    this.formApi.getForm(this.formId).subscribe( form =>{
      this.formTitle = form.formTitle;
    })
  }

  
}
