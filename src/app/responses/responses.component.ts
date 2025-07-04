import { Component, OnInit } from '@angular/core';
import { ApiResponse, FormResponse } from './responses.model';
import { ActivatedRoute } from '@angular/router';
import { ResponseApiService } from './response-api.service';
import { ViewDesignComponent } from "../view-design/view-design.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responses',
  imports: [ViewDesignComponent, CommonModule],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css'
})
export class ResponsesComponent implements OnInit {
  formResponses: FormResponse[] = [] ;
  formId!:number;
  activeTab: 'question' | 'individual' = 'individual';
  totalRes:number=0;
  totalQue:number=0;
  currentResponseIndex = 0;
  currentResponse?: FormResponse;
  
  constructor(private route: ActivatedRoute, private responseApi: ResponseApiService){}

  ngOnInit(): void {
    this.formId = +this.route.parent?.snapshot.params['id'];
    this.loadResponses()
  }

  loadResponses(){
    this.responseApi.getresponseById(this.formId).subscribe( {
      next: (data) => {
        if (data && data.length > 0 && data[0].response) {
          this.formResponses = data[0].response;
          if (this.formResponses.length > 0) {
            this.currentResponse = this.formResponses[0];
          } else {
            this.currentResponse = undefined;
          }
          this.totalRes = this.formResponses.length;
        } else {
          this.formResponses = [];
          this.currentResponse = undefined;
          this.totalRes = 0;
        }
      },
      error: err => console.log('Error!!', err)
       
    })
  }


  setTab(tab: 'question' | 'individual'){
    this.activeTab = tab;
  }

  navigateResponse(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentResponseIndex > 0) {
      this.currentResponseIndex--;
    } else if (direction === 'next' && this.currentResponseIndex < this.formResponses.length - 1) {
      this.currentResponseIndex++;
    }
    this.currentResponse = this.formResponses[this.currentResponseIndex];
  }
}
