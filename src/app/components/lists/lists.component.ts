import { Component } from '@angular/core';
import { MenunavComponent } from '../menunav/menunav.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
  imports: [MenunavComponent],
})
export default class ListsComponent {}
