/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, max } from 'rxjs';
import { RepoUsersService } from './repo.users.service';
import { RepoAlbumsService } from './repo.albums.service';
import { Album } from '../models/albums.model';
import { Router } from '@angular/router';
import { User } from '../models/users.model';

type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  email: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string;
  currentUser: User | null;
  albums: Album[];
  selectedAlbum: Album;
};

const initialState: State = {
  loginState: 'idle',
  token: '',
  currentUser: null,
  albums: [],
  selectedAlbum: {} as Album,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  router = inject(Router);
  private state$ = new BehaviorSubject<State>(initialState);
  private repoUsers = inject(RepoUsersService);
  private repoAlbums = inject(RepoAlbumsService);
  private detailCard = new BehaviorSubject<Album>({} as Album);
  public detailCard$ = this.detailCard.asObservable();

  jwt = jwtDecode;

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  get state(): State {
    return this.state$.value;
  }

  setState(state: State) {
    this.state$.next(state);
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currentPayload = this.jwt(token) as Payload;
    localStorage.setItem('TFD', token);
    this.repoUsers.getById(currentPayload.id).subscribe({
      next: (user) => {
        this.state$.next({
          ...this.state$.value,
          loginState: 'logged',
          token: token,
          currentUser: user as User,
        });
      },
      error: () => {
        this.setLoginState('error');
      },
    });
  }

  setLogout() {
    localStorage.removeItem('TFD');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: '',
      currentUser: null,
    });
  }
  loadAlbums() {
    this.repoAlbums.getAlbums().subscribe((albums) => {
      this.state$.next({ ...this.state$.value, albums });
    });
  }

  loadAlbumsByGenre(genre: string) {
    this.repoAlbums.getByGenre(genre).subscribe((data) => {
      this.state$.next({ ...this.state$.value, albums: data });
    });
  }

  randomAlbum(albumLength: number) {
    const randomIndex = Math.floor(Math.random() * albumLength);
    return randomIndex;
  }

  loadAlbumByName(albumName: string, albumArray: Album[]) {
    const foundAlbum = albumArray.find((album) => album.album === albumName);
    if (foundAlbum) {
      return foundAlbum;
    }

    return albumArray[0];
  }

  selectedCard(card: Album) {
    this.detailCard.next(card);
  }

  getSelectedCard(): Observable<Album> {
    return this.detailCard$;
  }

  goToDetails(id: string) {
    this.router.navigate([`/albums/${id}`]);
  }
}
