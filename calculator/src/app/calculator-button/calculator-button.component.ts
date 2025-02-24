import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator-button',
  imports: [CommonModule],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.scss',
})
export class CalculatorButtonComponent {
  @Input() displayValue: string = '';
  @Output() handleClick = new EventEmitter<string>();
  @Input() isDarkMode: boolean = false;

  onButtonClick(): void {
    this.handleClick.emit(this.displayValue);
  }
}
