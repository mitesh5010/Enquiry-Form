import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from '../form/form.service';

@Component({
  selector: 'app-form-title',
  imports: [FormsModule],
  templateUrl: './form-title.component.html',
  styleUrl: './form-title.component.css'
})
export class FormTitleComponent {
 constructor(public formService: FormService){}
}
