import { Component, OnInit } from '@angular/core';
import { ApiResponse, FormResponse } from './responses.model';
import { ActivatedRoute } from '@angular/router';
import { ResponseApiService } from './response-api.service';
import { ViewDesignComponent } from "../view-design/view-design.component";

@Component({
  selector: 'app-responses',
  imports: [ViewDesignComponent],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css'
})
export class ResponsesComponent implements OnInit {
  formResponses: FormResponse[] = [] ;
  formId!:number;
  activeTab: 'question' | 'individual' = 'question';
  totalRes:number=0;
  totalQue:number=0;
  currentResponseIndex = 0;
  currentResponse?: FormResponse;
  
  constructor(private route: ActivatedRoute, private responseApi: ResponseApiService){}

  ngOnInit(): void {
    this.formId = +this.route.parent?.snapshot.params['id'];
    console.log(this.formId)
    this.loadResponses()
  }

  loadResponses(){
    this.responseApi.getresponseById(this.formId).subscribe( {
      next: (data) => {
        console.log(data);
        this.formResponses = data[0].response;
        if (this.formResponses.length>0) {
          this.currentResponse = this.formResponses[0];
        } 
        this.totalRes = this.formResponses.length;
      },
      error: err => console.log('Error!!', err)
       
    })
  }


  setTab(tab: 'question' | 'individual'){
    this.activeTab = tab;
  }
}
