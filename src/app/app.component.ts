import { Component } from '@angular/core';

import { HeaderComponent } from "./header/header.component";
import { FormComponent } from "./form/form.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Enquiry-Form';
}
