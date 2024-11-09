import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPositionComponent } from './filter-position.component';

describe('FilterPositionComponent', () => {
  let component: FilterPositionComponent;
  let fixture: ComponentFixture<FilterPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
