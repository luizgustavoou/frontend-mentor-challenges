import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class AppButtonComponent {
  @Input() backgroundColor = "bg-red-500"
}
