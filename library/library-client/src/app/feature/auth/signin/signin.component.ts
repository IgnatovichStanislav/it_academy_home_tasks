import { Component, Inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/AuthenticationService';
import { NgIf } from '@angular/common';

import { IAuthenticationService } from '../../../core/services/contracts/IAuthenticationService';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgIf,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class SigninComponent {
  @Input() error: string | null = '';
  authService: IAuthenticationService;
  router: Router;

  constructor(
    @Inject(AuthenticationService) authService: IAuthenticationService,
    router: Router
  ) {
    this.authService = authService;
    this.router = router;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  submit() {
    if (this.form.valid) {
      this.authService.signin(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (err) => {
          this.error = err?.error ?? 'Login failed';
        },
      });
    }
  }
}
