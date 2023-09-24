import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  /** A custom diameter property. */
  @Input() diameter = 100;

  /** Setting this property changes LoadingIndicatorComponent to be inline. */
  @Input() inlineText?: string;

  /** Text color for the indicator. */
  @Input() color = 'text-accent-600';

  /**
   * Sets diameter to 18 if inline.
   */
  ngOnInit(): void {
    if (this.inlineText) {
      this.diameter = 18;
    }
  }
}
