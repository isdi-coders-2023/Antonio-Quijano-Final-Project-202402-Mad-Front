import { Component, inject } from '@angular/core';

import { StateService } from '../../services/state.service.js';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenunavComponent } from '../menunav/menunav.component.js';
import { RepoUsersService } from '../../services/repo.users.service.js';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  imports: [ReactiveFormsModule, MenunavComponent],
})
export default class SigninComponent {
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
