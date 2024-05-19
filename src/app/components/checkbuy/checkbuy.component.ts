import { Component } from '@angular/core';
import { MenunavComponent } from '../menunav/menunav.component';

@Component({
  selector: 'app-checkbuy',
  standalone: true,
  templateUrl: './checkbuy.component.html',
  styleUrl: './checkbuy.component.css',
  imports: [MenunavComponent],
})
export default class CheckbuyComponent {}
