import { Component, Input } from '@angular/core';
import { Album } from '../../models/albums.model';
import { CardAlbumComponent } from '../card-album/card-album.component';

@Component({
  selector: 'app-list-album',
  standalone: true,
  imports: [CardAlbumComponent],
  templateUrl: './list-album.component.html',
  styleUrl: './list-album.component.css',
})
export default class ListAlbumComponent {
  @Input() albums!: Album[];
}
