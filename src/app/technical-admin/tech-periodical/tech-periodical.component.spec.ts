import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPeriodicalComponent } from './tech-periodical.component';

describe('TechPeriodicalComponent', () => {
  let component: TechPeriodicalComponent;
  let fixture: ComponentFixture<TechPeriodicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechPeriodicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechPeriodicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
