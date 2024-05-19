import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Album } from '../../models/albums.model';
import ListAlbumComponent from '../list-album/list-album.component';

@Component({
  selector: 'app-searched',
  standalone: true,
  imports: [ListAlbumComponent],
  templateUrl: './searched.component.html',
  styleUrl: './searched.component.css',
})
export default class SearchedComponent {
  state = inject(StateService);
  albums: Album[] = [];
  constructor() {
    this.state.getState().subscribe((data) => (this.albums = data.albums));
  }
}
