import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../core/models/categories/Category';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [NgIf],
  templateUrl: './category-card.component.html',
  styleUrl: '../card.component.scss',
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Output() onSelectChange = new EventEmitter<Category | undefined>();
  @Input() selected: boolean = false;
  onCardClick(event: Event): void {
    this.onSelectChange.emit(!this.selected ? this.category : undefined);
  }
}
