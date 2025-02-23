import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoButtonComponent } from './more-info-button.component';

describe('MoreInfoButtonComponent', () => {
  let component: MoreInfoButtonComponent;
  let fixture: ComponentFixture<MoreInfoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreInfoButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreInfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
