import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css'],
  standalone: false
})
export class SummaryCardComponent {
  @Input() title!: string; // Title of the card
  @Input() value!: number; // Value displayed in the card
}
