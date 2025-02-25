import { Component } from '@angular/core';
import { DynamicContainerComponent } from './dynamic-container/dynamic-container.component';
import { ParentComponent } from './parent/parent.component';
import { AdvancedIfDirective } from './directives/advanced-if.directive';
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'practicum1';
  isVisible = false;
}
