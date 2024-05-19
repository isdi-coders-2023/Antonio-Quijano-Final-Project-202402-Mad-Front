import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Album } from '../models/albums.model';

@Injectable({
  providedIn: 'root',
})
export class RepoAlbumsService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/albums';

  getAlbums() {
    return this.httpClient.get<Album[]>(this.url);
  }

  getById(id: string) {
    return this.httpClient.get<Album>(this.url + '/' + id);
  }

  createAlbum(data: FormData) {
    return this.httpClient.post<Album>(this.url, data);
  }

  patchAlbum(data: FormData, id: string) {
    return this.httpClient.patch<Album>(this.url + '/' + id, data);
  }

  deleteAlbum(id: string) {
    return this.httpClient.delete<Album>(this.url + '/' + id);
  }

  getByGenre(genre: string) {
    return this.httpClient.get<Album[]>(this.url + '/search/' + genre);
  }
}
