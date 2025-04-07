import { Observable } from 'rxjs';
import { SigninRequest, SignupRequest } from '../../models/auth';
import { TokenResponse } from '../../models/auth/TokenResponse';

export interface IAuthenticationService {
  signin(credentials: SigninRequest): Observable<TokenResponse>;
  signup(data: SignupRequest): Observable<any>;
  isAuthenticated(): boolean;
}
