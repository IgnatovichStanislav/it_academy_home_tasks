import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { selectListItem } from '../../../core/models/selectListItem';
@Component({
  selector: 'app-select',
  imports: [NgFor, NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: selectListItem[] = [];
  @Input() nullable: boolean = false;
  @Output() onSelectChange = new EventEmitter<selectListItem | undefined>();

  constructor() {
    if (this.nullable)
      this.options = [{ text: 'Select', value: '' }, ...this.options];
  }

  onChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    var selectedItem = this.options.find(
      (option) => option.value == selectedValue
    );
    this.onSelectChange.emit(selectedItem);
  }
}
