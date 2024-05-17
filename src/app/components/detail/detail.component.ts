import { Component, inject } from '@angular/core';
import { Album } from '../../models/albums.model';
import { StateService } from '../../services/state.service';
import { ActivatedRoute } from '@angular/router';
import { RepoAlbumsService } from '../../services/repo.albums.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export default class DetailComponent {
  card: Album = {} as Album;
  route = inject(ActivatedRoute);
  repo = inject(RepoAlbumsService);
  id!: string;

  constructor(private store: StateService) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.repo.getById(this.id).subscribe((data) => {
      this.card = data;
    });

    this.store.getSelectedCard().subscribe((card) => {
      console.log(card);
      this.card = card;
    });
  }
}
