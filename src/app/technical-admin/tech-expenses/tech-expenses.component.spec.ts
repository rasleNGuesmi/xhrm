import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechExpensesComponent } from './tech-expenses.component';

describe('TechExpensesComponent', () => {
  let component: TechExpensesComponent;
  let fixture: ComponentFixture<TechExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
