import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:3000';
  private currentUser: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password }).pipe(
      catchError(error => {
        // Error handling
        return throwError(error);
      })
    );
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError(error => {
        // Error handling
        return throwError(error);
      })
    ).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.currentUser = username;
      this.router.navigate(['/']); // Navigálás a főoldalra
    });
  }

  getUsername(): string | null {
    return this.currentUser;
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.router.navigate(['/login']); // Navigálás a bejelentkező oldalra
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
