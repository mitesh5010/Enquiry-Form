import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-views',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ViewsComponent {

}
