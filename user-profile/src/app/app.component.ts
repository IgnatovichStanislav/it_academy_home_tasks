import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MoreInfoButtonComponent } from './more-info-button/more-info-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    UserInfoComponent,
    MoreInfoButtonComponent,
    UserProfileComponent,
  ],
})
export class AppComponent {
  title = 'angular-home-project';
}
