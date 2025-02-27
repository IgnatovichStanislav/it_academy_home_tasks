import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-container',
  imports: [],
  templateUrl: './dynamic-container.component.html',standalone:true
})
export class DynamicContainerComponent {
  @ViewChild('tpl', { read: TemplateRef }) tpl!: TemplateRef<any>;

  constructor(private viewContainer: ViewContainerRef) {}

  addTemplate(name: string) {
    this.viewContainer.createEmbeddedView(this.tpl, { name: name });
  }

  clearTemplates() {
    this.viewContainer.clear();
  }
}
