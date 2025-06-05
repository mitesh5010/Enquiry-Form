import { Component, computed,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = signal<string>('Untitle form');
  
  enterTitle = computed(() => {
    return this.title().trim();
  })
  
  onPublish() {
    console.log(
      this.enterTitle()
    );
  }
  
}
