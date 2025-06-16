import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/responses';

  getresponseById(formId: number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}?formId=${formId}`)
  }

  updateResponse(id: number, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, body);
  }

  postResponse(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, body);
  }
}
