import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtResponse } from '../model/jwt-response';
import { RegisterRequest } from '../model/register-request';
import { LoginRequest } from '../model/login-request';
import { Utilisateur } from '../model/utilisateur';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8089/sahty/api/auth'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  login(username: string, password: string, email: string): Observable<JwtResponse> {
    const loginUrl = `${this.baseUrl}/signin`;
    return this.http.post<JwtResponse>(loginUrl, { username, password, email });
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    const registerUrl = `${this.baseUrl}/register`;
    return this.http.post(registerUrl, registerRequest);
  }

  getUserProfile(email: string): Observable<any> {
    const profileUrl = `${this.baseUrl}/profile?email=${email}`;
    return this.http.get(profileUrl);
  }
  
  updateProfile(email: string, utilisateur: Utilisateur): Observable<Utilisateur> {
    const url = `${this.baseUrl}/updateProfile/${email}`;
    return this.http.put<Utilisateur>(url, utilisateur)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur ${error.status}, ` +
        `Erreur : ${error.error}`);
    }
    // Retourne une erreur observable avec un message convivial
    return throwError(
      'Une erreur s\'est produite; veuillez réessayer plus tard.');
  }

}
