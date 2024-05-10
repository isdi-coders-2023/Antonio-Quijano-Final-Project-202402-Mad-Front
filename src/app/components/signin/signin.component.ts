import { Component, inject } from '@angular/core';
import { RepoUsersService } from '../../services/repo.users.service';
import { StateService } from '../../services/state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  registeredError: boolean;
  repoService = inject(RepoUsersService);
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.registeredError = false;
  }
  signInForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  handleRegister() {
    const { name, password, email } = this.signInForm.value;

    if (name && password && email) {
      const registerData = {
        name: name,
        password: password,
        email: email,
      };

      this.repoService.create(registerData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error: Error) => {
          console.log(error);
          this.registeredError = true;
        },
      });
    }
  }
}
