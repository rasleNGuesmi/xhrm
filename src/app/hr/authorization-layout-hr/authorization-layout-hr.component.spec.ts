import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationLayoutHrComponent } from './authorization-layout-hr.component';

describe('AuthorizationLayoutHrComponent', () => {
  let component: AuthorizationLayoutHrComponent;
  let fixture: ComponentFixture<AuthorizationLayoutHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationLayoutHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationLayoutHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
