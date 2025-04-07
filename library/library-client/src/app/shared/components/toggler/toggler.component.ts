import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss'],
})
export class TogglerComponent {
  @Input() label: string = '';
  @Input() value: boolean = false;
  @Output() onToggle = new EventEmitter<boolean>();

  onChange(event: Event): void {
    this.onToggle.emit((event.target as HTMLInputElement).checked);
  }
}
