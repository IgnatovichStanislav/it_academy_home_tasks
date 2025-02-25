import { Component } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MoreInfoButtonComponent } from '../more-info-button/more-info-button.component';

@Component({
  selector: 'app-user-profile',
  imports: [UserInfoComponent, MoreInfoButtonComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {}
