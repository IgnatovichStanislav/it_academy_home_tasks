import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() classes: string = '';
  @Output() onClick = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.onClick.emit(event);
  }
}
