import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { StateService } from '../../services/state.service.js';
import { User } from '../../models/users.model.js';
import SigninComponent from './signin.component.js';
import { RepoUsersService } from '../../services/repo.users.service.js';

describe('RegisterComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockRepoUsersService: jasmine.SpyObj<RepoUsersService>;
  let mockStateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    mockRepoUsersService = jasmine.createSpyObj('RepoUsersService', ['create']);
    mockStateService = jasmine.createSpyObj('StateService', ['setLoginState']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SigninComponent],
      providers: [
        { provide: RepoUsersService, useValue: mockRepoUsersService },
        { provide: StateService, useValue: mockStateService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with empty fields', () => {
    expect(component.signInForm.get('name')?.value).toEqual('');
    expect(component.signInForm.get('email')?.value).toEqual('');
    expect(component.signInForm.get('password')?.value).toEqual('');
  });

  it('should call onSubmit and create user when form is submitted', () => {
    const form = component.signInForm;
    spyOn(component, 'handleRegister').and.callThrough();
    mockRepoUsersService.create.and.returnValue(of({} as User));
    const user = {
      name: 'antonio',
      email: 'antonio@gmail.com',
      password: 'testuser',
    };

    form.setValue(user);
    fixture.detectChanges();
    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    expect(component.handleRegister).toHaveBeenCalled();
    expect(component.repoService.create).toHaveBeenCalledWith(user);
  });

  it('error', () => {});
});
