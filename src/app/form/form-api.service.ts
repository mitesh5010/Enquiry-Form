import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  private apiUrl = 'http://localhost:3000/forms';

  constructor(private http: HttpClient) { }

  createForm(data: any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }

  getForm(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
