import { Component, OnInit } from '@angular/core';
import { CalculatorResultComponent } from '../calculator-result/calculator-result.component';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  imports: [CalculatorResultComponent, CalculatorButtonComponent, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  calculationResult: string = '';
  isDarkMode = false;

  onCalculatorButtonClick(event: string): void {
    if (!isNaN(parseInt(event)) || !this.calculationResult.endsWith(event)) {
      this.calculationResult += event;
    }
  }

  clearResult() {
    this.calculationResult = '';
  }

  calculate() {
    try {
      this.calculationResult = eval(this.calculationResult);
    } catch (error) {
      this.calculationResult = 'Error';
    }
  }

  onTogglerClick() {
    this.isDarkMode = !this.isDarkMode;
  }
}
