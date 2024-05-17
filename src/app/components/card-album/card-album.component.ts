import { Component, Input, inject } from '@angular/core';
import { Album } from '../../models/albums.model';
import { Router, RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-card-album',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-album.component.html',
  styleUrl: './card-album.component.css',
})
export class CardAlbumComponent {
  router = inject(Router);
  state = inject(StateService);
  @Input() album!: Album;
}
