import { Component, inject } from '@angular/core';
import { MenunavComponent } from '../menunav/menunav.component';

import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MenunavComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export default class FilterComponent {
  router = inject(Router);
  genres = [
    'rock',
    'pop',
    'hipHop',
    'randB',
    'electronic',
    'metal',
    'jazz',
    'latin',
  ];
  constructor(private store: StateService) {}

  selectFilter(genre: string) {
    this.store.loadAlbumsByGenre(genre);
    this.router.navigate(['/genre', genre]);
  }
}
