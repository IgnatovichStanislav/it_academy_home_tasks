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

  buttons: {
    displayValue: string;
    handleClick: (event?: string | undefined) => void;
  }[] = [
    { displayValue: '1', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '2', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '3', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '+', handleClick: (e) => this.onCalculatorButtonClick(e) },

    { displayValue: '4', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '5', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '6', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '-', handleClick: (e) => this.onCalculatorButtonClick(e) },

    { displayValue: '7', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '8', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '9', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '*', handleClick: (e) => this.onCalculatorButtonClick(e) },

    { displayValue: '0', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '/', handleClick: (e) => this.onCalculatorButtonClick(e) },
    { displayValue: '=', handleClick: (e) => this.calculate() },
    { displayValue: 'C', handleClick: (e) => this.clearResult() },
  ];

  onCalculatorButtonClick(event?: string): void {
    if (
      event &&
      (!isNaN(parseInt(event)) || !this.calculationResult.endsWith(event))
    ) {
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
