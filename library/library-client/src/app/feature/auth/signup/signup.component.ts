import { Component } from '@angular/core';
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
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NgIf } from '@angular/common';
import { charsDigitsValidator } from '../../../core/validators/chars.digits.validator';
@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgIf,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class SignupComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      charsDigitsValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      charsDigitsValidator(),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      charsDigitsValidator(),
    ]),
  });

  error: string | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  submit() {
    if (this.form.valid) {
      this.authenticationService.signup(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          this.error = err.error ?? 'Registration error.';
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
