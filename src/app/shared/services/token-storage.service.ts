import {Injectable} from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    const expiresAt = localStorage.getItem('expiresAt');
    if (expiresAt) {
      return moment().isSameOrBefore(moment(expiresAt));
    }
    return false;
  }

  saveToken(data: {jwt: string, expiresAt: string}, username: string): void {
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('expiresAt', data.expiresAt);
    localStorage.setItem('username', username);
  }
}
