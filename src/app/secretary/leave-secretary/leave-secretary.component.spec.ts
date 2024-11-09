import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSecretaryComponent } from './leave-secretary.component';

describe('LeaveSecretaryComponent', () => {
  let component: LeaveSecretaryComponent;
  let fixture: ComponentFixture<LeaveSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
