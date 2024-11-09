import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTodayPresenceComponent } from './tech-today-presence.component';

describe('TechTodayPresenceComponent', () => {
  let component: TechTodayPresenceComponent;
  let fixture: ComponentFixture<TechTodayPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechTodayPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechTodayPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
