import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  `${environment.apiUrl}`;
  private tokenKey = 'auth-token';
  private userKey = 'auth_user';
  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken())

  constructor(private http: HttpClient) { }

  login(email:string, password: string){
    return this.http.post<{
      user: User; accessToken: string 
}>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.accessToken);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        this.isLoggedIn$.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn$.next(false);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  hasToken() {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
}
