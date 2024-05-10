import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepoUsersService } from './repo.users.service';

type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  email: string;
  role: string;
} & JwtPayload;

export type UserState = {
  loginState: LoginState;
  token: string | null;
  currentUser: unknown | null;
};

const initialState: UserState = {
  loginState: 'idle',
  token: null,
  currentUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private userState$ = new BehaviorSubject<UserState>(initialState);
  private repoUsers = inject(RepoUsersService);

  constructor() {
    const storedToken = localStorage.getItem('TFD');
    if (storedToken) {
      this.setLogin(storedToken);
    }
  }

  getUserState(): Observable<UserState> {
    return this.userState$.asObservable();
  }

  get userState(): UserState {
    return this.userState$.value;
  }

  setLoginState(loginState: LoginState): void {
    this.userState$.next({ ...this.userState$.value, loginState });
  }

  setLogin(token: string) {
    const currentPayload = jwtDecode(token) as Payload;
    localStorage.setItem('TFD', token);
    this.repoUsers.getById(currentPayload.id).subscribe({
      next: (user) => {
        this.userState$.next({
          loginState: 'logged',
          token: token,
          currentUser: user,
        });
      },
      error: () => {
        this.setLoginState('error');
      },
    });
  }

  setLogout() {
    localStorage.removeItem('TFD');
    this.userState$.next({
      loginState: 'idle',
      token: null,
      currentUser: null,
    });
  }
}
