import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenunavComponent } from './components/menunav/menunav.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ListsComponent } from './components/lists/lists.component';
import { FilterComponent } from './components/filter/filter.component';
import { AddalbumComponent } from './components/addalbum/addalbum.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    MenunavComponent,
    LoginComponent,
    SigninComponent,
    ListsComponent,
    FilterComponent,
    AddalbumComponent,
  ],
})
export class AppComponent {
  title = 'MANTRAPROJECTFRONT';
}
