import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPresenceComponent } from './tech-presence.component';

describe('TechPresenceComponent', () => {
  let component: TechPresenceComponent;
  let fixture: ComponentFixture<TechPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
