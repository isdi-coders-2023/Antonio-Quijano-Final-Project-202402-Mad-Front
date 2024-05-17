import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from './services/state.service';
import { MenunavComponent } from './components/menunav/menunav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MenunavComponent],
})
export class AppComponent {
  title = 'MANTRAPROJECTFRONT';
  state = inject(StateService);

  constructor() {
    const storedToken = localStorage.getItem('TFD');
    if (storedToken) {
      this.state.setLogin(storedToken);
    }
  }
}
