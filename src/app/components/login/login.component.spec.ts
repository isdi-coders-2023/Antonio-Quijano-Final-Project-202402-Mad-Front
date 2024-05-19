import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { StateService } from '../../services/state.service';
import LoginComponent from './login.component';
import { RepoUsersService } from '../../services/repo.users.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRepoUserService: jasmine.SpyObj<RepoUsersService>;
  let mockStateService: jasmine.SpyObj<StateService>;
  beforeEach(async () => {
    mockRepoUserService = jasmine.createSpyObj('RepoUsersService', ['login']);
    mockStateService = jasmine.createSpyObj('StateService', [
      'setLogin',
      'setLoginState',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: RepoUsersService, useValue: mockRepoUserService },
        { provide: StateService, useValue: mockStateService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on form submission', () => {
    spyOn(component, 'handleLogin').and.callThrough();
    const form = component.loginForm;
    form.setValue({
      email: 'test@test.com',
      password: 'password',
    });
    fixture.detectChanges();
    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    expect(component.handleLogin).toHaveBeenCalled();
  });

  it('should call repoUserService login method with correct user data', () => {
    const email = 'test@test.com';
    const password = 'password';
    const form = component.loginForm;
    const token = 'mockToken';
    mockRepoUserService.login.and.returnValue(of({ token: token }));
    form.setValue({
      email: email,
      password: password,
    });
    fixture.detectChanges();
    component.handleLogin();
    expect(mockRepoUserService.login).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });

  it('should navigate to home on successful login', () => {
    const token = 'mockToken';
    mockRepoUserService.login.and.returnValue(of({ token: token }));
    const user = 'test@test.com';
    const password = 'password';
    const form = component.loginForm;
    form.setValue({
      email: user,
      password: password,
    });
    fixture.detectChanges();
    component.handleLogin();
    expect(mockStateService.setLogin).toHaveBeenCalledWith(token);
  });

  it('should set login state to error on login error', () => {
    const error = 'Mock error';
    mockRepoUserService.login.and.returnValue(
      throwError(() => new Error(error))
    );
    const user = 'test@test.com';
    const password = 'password';
    const form = component.loginForm;
    form.setValue({
      email: user,
      password: password,
    });
    fixture.detectChanges();
    component.handleLogin();
    expect(mockStateService.setLoginState).toHaveBeenCalledWith('error');
  });
});
