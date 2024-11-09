import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationHrComponent } from './authorization-hr.component';

describe('AuthorizationHrComponent', () => {
  let component: AuthorizationHrComponent;
  let fixture: ComponentFixture<AuthorizationHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
