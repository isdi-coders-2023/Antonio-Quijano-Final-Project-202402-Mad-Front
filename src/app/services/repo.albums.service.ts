import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Album, AlbumCreateDto } from '../models/albums.model';

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

  createAlbum(data: AlbumCreateDto, token: string) {
    return this.httpClient.post<Album>(this.url, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  patchAlbum(data: Partial<AlbumCreateDto>, id: string, token: string) {
    return this.httpClient.patch<Album>(this.url + '/' + id, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteAlbum(id: string, token: string) {
    return this.httpClient.delete<Album>(this.url + '/' + id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getByGenre(genre: string) {
    return this.httpClient.get<Album[]>(this.url + '/search/' + genre);
  }
}
