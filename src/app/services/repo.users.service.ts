import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreateDto } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class RepoUsersService {
  httpClient = inject(HttpClient);
  // url = environment.apiUrl + `/users`;
  url = 'http://localhost:3400/users';

  login(data: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }

  getById(id: string) {
    return this.httpClient.get(this.url + '/' + id);
  }

  create(data: UserCreateDto) {
    const url = this.url + '/register';
    return this.httpClient.post(url, data);
  }
}
