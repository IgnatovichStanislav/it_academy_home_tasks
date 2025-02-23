import { Directive } from '@angular/core';

interface CalculatorButtonConfig {
  displayValue: string;
  handleClick: (event: string) => void;
}

@Directive({
  selector: '[appCalculatorButtonConfig]',
})
export class CalculatorButtonConfigDirective {
  private config: CalculatorButtonConfig | undefined;
  constructor() {}
}
