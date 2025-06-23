import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDesignComponent } from "../view-design/view-design.component";

@Component({
  selector: 'app-preview',
  imports: [ReactiveFormsModule, ViewDesignComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit {
  form!: FormGroup;
  formId!: number;
  shareUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];


    this.shareUrl = `${window.location.origin}/forms/${this.formId}` 
  }

  copyLink() {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  onEdit(){
    if (this.formId) {
      this.router.navigate(['/forms',this.formId,'edit'])
    }
  }

}
