import { Component, computed,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormService } from '../form/form.service';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(public formService: FormService) {}

  formTitle = signal<string>('Untitle form');
  
  // enterTitle = computed(() => {
  //   return this.title().trim();
  // })
  
  onPublish() {
    console.log({
      formTitle:this.formTitle().trim(),
      title: this.formService.title().trim(),
      description: this.formService.description().trim(),
      questions: this.formService.questions(),
    }
    );
  }
  
}
