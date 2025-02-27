import {
  Directive,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appAdvancedIf]',
  standalone:true
})
export class AdvancedIfDirective {
  @Input() set appAdvancedIf({
    condition,
    delay,
  }: {
    condition: boolean;
    delay: number;
  }) {
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
