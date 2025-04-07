import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/UserService';
import { User } from '../../core/models/user';
import { NgIf } from '@angular/common';
import { IUserService } from '../../core/services/contracts/IUserService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: User | null = null;
  userService: IUserService;

  constructor(@Inject(UserService) userService: IUserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout(): void {
    this.userService.setUser(null);
    this.user = null;
    window.location.reload();
  }
}
