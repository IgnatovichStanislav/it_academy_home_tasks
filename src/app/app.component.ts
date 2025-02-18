import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MoreInfoButtonComponent } from './more-info-button/more-info-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, UserInfoComponent, MoreInfoButtonComponent],
})
export class AppComponent {
  title = 'angular-home-project';
}
