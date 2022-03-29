import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://p-frei.de/backend/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'authenticate',
      {
        userName,
        password,
      },
      httpOptions
    );
  }

  register(userName: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        userName,
        password,
      },
      httpOptions
    );
  }
}
