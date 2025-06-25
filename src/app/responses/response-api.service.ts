import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from './responses.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseApiService {

  constructor(private http: HttpClient) { }

  private apiUrl =  `${environment.apiUrl}/responses`;

  getresponseById(formId: number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}?formId=${formId}`)
  }


  updateResponse(id: number, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, body);
  }

  postResponse(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  getResponse(formId:number, responseId: number): Observable<any>{
    return this.http.get<ApiResponse>(`${this.apiUrl}?formId=${formId}`)
      .pipe(
        map( data => {
          const response = data.response.find(r => r.rId === responseId);
          if (!response) throw new Error('Response not found');
          return response;
        }) 
      )
  }
}
