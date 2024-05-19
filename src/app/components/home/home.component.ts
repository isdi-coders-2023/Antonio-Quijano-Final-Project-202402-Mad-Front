import { Component, inject } from '@angular/core';
import { MenunavComponent } from '../menunav/menunav.component';
import { StateService } from '../../services/state.service';
import { Album } from '../../models/albums.model';
import ListAlbumComponent from '../list-album/list-album.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenunavComponent, ListAlbumComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  state = inject(StateService);
  albums: Album[] = [];
  randomAlbum!: Album;
  newsAlbum: Album[] = [];
  bestPriceAlbum: Album[] = [];
  router = inject(Router);
  constructor() {
    this.state.loadAlbums();

    this.state.getState().subscribe((data) => {
      this.albums = data.albums;
      this.randomAlbum =
        data.albums[this.state.randomAlbum(data.albums.length)];
      this.newsAlbum[0] = this.state.loadAlbumByName('Nevermind', this.albums);
      this.newsAlbum[1] = this.state.loadAlbumByName('Discovery', this.albums);
      this.bestPriceAlbum[0] = this.state.loadAlbumByName('Re', this.albums);
      this.bestPriceAlbum[1] = this.state.loadAlbumByName('Blond', this.albums);
    });
  }
  goToDetails(id: string) {
    this.router.navigate([`/albums/${id}`]);
  }
}
