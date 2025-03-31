import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../config';
import { AuthPaths } from '../api-paths';
import { SigninRequest, SignupRequest } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  signin(credentials: SigninRequest): Observable<any> {
    const url = `${environment.baseApiUrl}${AuthPaths.Signin}`;

    return this.http.post(url, credentials, { observe: 'response' }).pipe(
      tap((response: any) => {
        if (response.status === 200) {
          sessionStorage.setItem('authToken', response.body.authToken);
        } else {
          console.log('Response:', response.body);
        }
      })
    );
  }

  signup(data: SignupRequest): Observable<any> {
    const url = `${environment.baseApiUrl}${AuthPaths.Signup}`;

    return this.http.post(url, data).pipe();
  }
}
