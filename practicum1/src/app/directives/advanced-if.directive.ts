import {
  Directive,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appAdvancedIf]',
})
export class AdvancedIfDirective {
  @Input() set appAdvanceIf({
    condition,
    delay,
  }: {
    condition: boolean;
    delay: number;
  }) {
    console.log(this.templateRef);
    if (this.delayTimeout) clearTimeout(this.delayTimeout);
    if (condition) {
      this.delayTimeout = setTimeout(() => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }, delay);
    } else {
      this.viewContainerRef.clear();
    }
  }

  delayTimeout: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
}
