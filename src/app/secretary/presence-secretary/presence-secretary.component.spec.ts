import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceSecretaryComponent } from './presence-secretary.component';

describe('PresenceSecretaryComponent', () => {
  let component: PresenceSecretaryComponent;
  let fixture: ComponentFixture<PresenceSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresenceSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
