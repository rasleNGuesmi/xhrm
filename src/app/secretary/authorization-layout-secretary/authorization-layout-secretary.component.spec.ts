import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationLayoutSecretaryComponent } from './authorization-layout-secretary.component';

describe('AuthorizationLayoutSecretaryComponent', () => {
  let component: AuthorizationLayoutSecretaryComponent;
  let fixture: ComponentFixture<AuthorizationLayoutSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationLayoutSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationLayoutSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
