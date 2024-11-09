import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesHrComponent } from './expenses-hr.component';

describe('ExpensesHrComponent', () => {
  let component: ExpensesHrComponent;
  let fixture: ComponentFixture<ExpensesHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
