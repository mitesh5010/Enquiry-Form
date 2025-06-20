import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '../responses/responses.model';
import { Form } from '../all-forms/forms.model';


@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  private apiUrl = 'http://localhost:3000/forms';
  private apiFormUrl = 'http://localhost:3000/forms/1';

  private apiResponse = 'http://localhost:3000/responses';


  constructor(private http: HttpClient) { }

  createForm(data: any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }

  getForms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getForm(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  postResponse(data: ApiResponse){
    return this.http.post(this.apiResponse, data);
  }

  getFormTest(): Observable<any> {
    return this.http.get(this.apiFormUrl);
  }

}
