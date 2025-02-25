import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';
@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('child') child!: ChildComponent;
  @ViewChild('contentRef', { static: true }) content!: ElementRef;

  ngAfterViewInit(): void {
    console.log(
      'Sent content nativeElement textContent',
      this.content.nativeElement.textContent
    );
  }

  logChildContent() {
    console.log(
      'Dinamically added content',
      this.content.nativeElement.textContent
    );
  }
  isVisible: boolean = false;
}
