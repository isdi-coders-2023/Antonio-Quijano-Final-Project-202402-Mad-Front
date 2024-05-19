import { Component, inject } from '@angular/core';
import { RepoUsersService } from '../../services/repo.users.service';
import { StateService } from '../../services/state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenunavComponent } from '../menunav/menunav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterLink, MenunavComponent],
})
export default class LoginComponent {
  repoService = inject(RepoUsersService);
  stateService = inject(StateService);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  handleLogin() {
    const { password, email } = this.loginForm.value;

    if (password && email) {
      const loginData = {
        password: password,
        email: email,
      };

      this.repoService.login(loginData).subscribe({
        next: (data) => {
          this.stateService.setLogin(data.token);
        },
        error: (error: Error) => {
          console.error(error);
          this.stateService.setLoginState('error');
        },
      });
    }
  }
}
