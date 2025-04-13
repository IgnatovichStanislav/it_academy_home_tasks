import {
  Directive,
  Inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { IUserService } from '../../core/services/contracts/IUserService';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/UserService';

@Directive({
  selector: '[currentUser]',
})
export class CurrentUserDirective implements OnInit {
  templateRef: TemplateRef<any>;
  viewContainer: ViewContainerRef;
  userService: IUserService;

  constructor(
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    @Inject(UserService) userService: IUserService
  ) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.userService = userService;
  }

  ngOnInit(): void {
    const currentUser: User | null = this.userService.getUser();
    if (currentUser) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: currentUser,
      });
    } else {
      this.viewContainer.clear();
    }
  }
}
