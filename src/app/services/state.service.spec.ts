import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
import { of } from 'rxjs';
import { RepoUsersService } from './repo.users.service';

describe('StateService', () => {
  let service: StateService;

  const mockUsersRepoService = jasmine.createSpyObj('RepoUsersService', {
    login: of({ token: 'Baerer token' }),
    getById: of({ id: '1', role: 'admin' }),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RepoUsersService, useValue: mockUsersRepoService },
      ],
    });
    service = TestBed.inject(StateService);
    spyOn(service, 'jwt').and.returnValue({ id: '1', role: 'admin' });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set login state', () => {
    service.setLoginState('logged');
    expect(service.userState.loginState).toBe('logged');
  });

  it('should set login', () => {
    service.setLogin('token');
    expect(service.userState.token).toBe('token');
  });

  it('should get state', () => {
    service.getUserState().subscribe((state) => {
      expect(state).toEqual(service.userState);
    });
  });

  it('should set logout', () => {
    service.setLogout();
    expect(service.userState).toEqual({
      loginState: 'idle',
      token: null,
      currentUser: null,
    });
  });
});
