import { Component, Input, inject } from '@angular/core';
import { Album } from '../../models/albums.model';
import { CardAlbumComponent } from '../card-album/card-album.component';
import { RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
  imports: [CardAlbumComponent, RouterLink],
})
export default class CatalogueComponent {
  state = inject(StateService);
  @Input() albums!: Album[];
  constructor() {
    this.state.loadAlbums();

    this.state.getState().subscribe((data) => {
      this.albums = data.albums;
    });
  }
}
