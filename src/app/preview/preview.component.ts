import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormApiService } from '../form/form-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../form/form.service';

@Component({
  selector: 'app-preview',
  imports: [ReactiveFormsModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  form!: FormGroup;
  formId!: number;
  shareUrl!: string;

  constructor(
    private formApiService: FormApiService,
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formId = +this.route.snapshot.params['id'];

    this.formApiService.getForm(this.formId).subscribe((data) => {
    this.form = this.formService.buildForm(data);    
    })

    this.shareUrl = `${window.location.origin}/forms/${this.formId}` 
  }
  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  getOptions(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
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
