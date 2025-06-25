import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  private apiUrl =  `${environment.apiUrl}/forms`;


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

  updateForm(id:number, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data);
  }

}
