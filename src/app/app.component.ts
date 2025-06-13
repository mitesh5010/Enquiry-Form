import { Component, computed, inject, signal } from '@angular/core';

import { HeaderComponent } from "./header/header.component";
import { FormComponent } from "./form/form.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Enquiry-Form';


}
