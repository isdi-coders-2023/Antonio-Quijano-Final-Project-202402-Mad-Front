import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenunavComponent } from '../menunav/menunav.component';
import { StateService } from '../../services/state.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-inside-app',
  standalone: true,
  templateUrl: './inside-app.component.html',
  styleUrl: './inside-app.component.css',
  imports: [RouterLink, MenunavComponent],
})
export default class InsideAppComponent {
  state = inject(StateService);
  user: User | null = null;

  constructor() {
    this.state.getState().subscribe((data) => {
      this.user = data.currentUser;
    });
  }
}
