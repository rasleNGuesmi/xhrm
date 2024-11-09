import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalHrComponent } from './periodical-hr.component';

describe('PeriodicalHrComponent', () => {
  let component: PeriodicalHrComponent;
  let fixture: ComponentFixture<PeriodicalHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicalHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodicalHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
