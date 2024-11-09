import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechUpdateExpenseComponent } from './tech-update-expense.component';

describe('TechUpdateExpenseComponent', () => {
  let component: TechUpdateExpenseComponent;
  let fixture: ComponentFixture<TechUpdateExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechUpdateExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechUpdateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
