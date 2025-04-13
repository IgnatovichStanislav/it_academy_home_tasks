import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../services/UserService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userService: UserService;
  router: Router;

  //@Inject(UserService) userService: IUserService НЕ РАБОТАЕТ!!!!!
  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.userService.getUser() !== null) {
      return true;
    }

    return this.router.createUrlTree(['/signin'], {
      queryParams: { returnUrl: state.url },
    });
  }
}
