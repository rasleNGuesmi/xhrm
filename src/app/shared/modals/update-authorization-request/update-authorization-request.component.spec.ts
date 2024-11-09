import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuthorizationRequestComponent } from './update-authorization-request.component';

describe('UpdateAuthorizationRequestComponent', () => {
  let component: UpdateAuthorizationRequestComponent;
  let fixture: ComponentFixture<UpdateAuthorizationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAuthorizationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAuthorizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
