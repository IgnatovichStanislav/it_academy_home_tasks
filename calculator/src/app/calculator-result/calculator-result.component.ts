import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calculator-result',
  imports: [CommonModule],
  templateUrl: './calculator-result.component.html',
  styleUrl: './calculator-result.component.scss',
})
export class CalculatorResultComponent {
  @Input() result: string = '';
  @Input() isDarkMode: boolean = false;
}
