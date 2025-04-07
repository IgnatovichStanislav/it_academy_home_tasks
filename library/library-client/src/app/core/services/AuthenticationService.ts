import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../config';
import { AuthPaths } from '../api-paths';
import { SigninRequest, SignupRequest } from '../models/auth';
import { UserService } from './UserService';
import { IAuthenticationService } from './contracts/IAuthenticationService';
import { TokenResponse } from '../models/auth/TokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements IAuthenticationService {
  http: HttpClient;
  userService: UserService;
  constructor(http: HttpClient, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  signin(credentials: SigninRequest): Observable<TokenResponse> {
    const url = `${environment.baseApiUrl}${AuthPaths.Signin}`;

    return this.http.post<TokenResponse>(url, credentials).pipe(
      tap((response: TokenResponse) => {
        sessionStorage.setItem('authToken', response.authToken);
        this.userService.setUser(response.user);
      })
    );
  }

  signup(data: SignupRequest): Observable<any> {
    const url = `${environment.baseApiUrl}${AuthPaths.Signup}`;

    return this.http.post(url, data).pipe();
  }

  isAuthenticated(): boolean {
    return this.userService.getUser() !== null;
  }
}
