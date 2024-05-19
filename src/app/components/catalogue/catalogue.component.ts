import { Component, Input, inject } from '@angular/core';
import { Album } from '../../models/albums.model';
import { CardAlbumComponent } from '../card-album/card-album.component';
import { RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';
import { RepoAlbumsService } from '../../services/repo.albums.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
  imports: [CardAlbumComponent, RouterLink],
})
export default class CatalogueComponent {
  state = inject(StateService);
  repo = inject(RepoAlbumsService);
  @Input() albums!: Album[];
  constructor() {
    this.state.loadAlbums();

    this.state.getState().subscribe((data) => {
      this.albums = data.albums;
    });
  }
  getDeleteAlbum(id: string) {
    this.repo.deleteAlbum(id).subscribe((data) => {
      const albums = this.state.state.albums.filter(
        (element) => element.id !== data.id
      );
      this.state.setState({ ...this.state.state, albums });
    });
  }
}
