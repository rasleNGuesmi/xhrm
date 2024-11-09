import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalSecretaryComponent } from './periodical-secretary.component';

describe('PeriodicalSecretaryComponent', () => {
  let component: PeriodicalSecretaryComponent;
  let fixture: ComponentFixture<PeriodicalSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicalSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodicalSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
