import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  providers: [AuthenticationService],
})
export class SigninComponent {
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

  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  submit() {
    if (this.form.valid) {
      this.authService.signin(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: () => {
          this.error = 'Login failed';
        },
      });
    }
  }
}
