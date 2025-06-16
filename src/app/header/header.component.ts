import { Component, computed,  OnInit,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormService } from '../form/form.service';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  formId!:string;
  
  constructor(public formService: FormService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>{
      this.formId =params.get('id')!;
    })
  }

}
