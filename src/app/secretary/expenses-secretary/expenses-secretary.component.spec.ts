import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSecretaryComponent } from './expenses-secretary.component';

describe('ExpensesSecretaryComponent', () => {
  let component: ExpensesSecretaryComponent;
  let fixture: ComponentFixture<ExpensesSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
