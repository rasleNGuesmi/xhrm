import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCreateExpenseComponent } from './tech-create-expense.component';

describe('TechCreateExpenseComponent', () => {
  let component: TechCreateExpenseComponent;
  let fixture: ComponentFixture<TechCreateExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCreateExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCreateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
