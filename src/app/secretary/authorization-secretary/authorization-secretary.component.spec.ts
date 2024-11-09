import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationSecretaryComponent } from './authorization-secretary.component';

describe('AuthorizationSecretaryComponent', () => {
  let component: AuthorizationSecretaryComponent;
  let fixture: ComponentFixture<AuthorizationSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
