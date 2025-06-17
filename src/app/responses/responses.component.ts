import { Component, OnInit } from '@angular/core';
import { ApiResponse, FormResponse } from './responses.model';
import { ActivatedRoute } from '@angular/router';
import { ResponseApiService } from './response-api.service';

@Component({
  selector: 'app-responses',
  imports: [],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css'
})
export class ResponsesComponent implements OnInit {
  formResponse!: ApiResponse ;
  formId!:number;
  activeTab: 'question' | 'individual' = 'question';
  totalRes:number=0;
  totalQue:number=0;

  constructor(private route: ActivatedRoute, private responseApi: ResponseApiService){}

  ngOnInit(): void {
    this.formId = +this.route.parent?.snapshot.params['id'];
    this.responseApi.getresponseById(this.formId).subscribe(data => {
      this.formResponse = data[0];
      this.totalRes = this.formResponse.response.length;
      this.totalQue = this.formResponse.response[0].questionAnswer.length;
    });
  }


  setTab(tab: 'question' | 'individual'){
    this.activeTab = tab;
  }
}
