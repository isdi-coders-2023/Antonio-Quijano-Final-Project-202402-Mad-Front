import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menunav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menunav.component.html',
  styleUrl: './menunav.component.css',
})
export class MenunavComponent {}
