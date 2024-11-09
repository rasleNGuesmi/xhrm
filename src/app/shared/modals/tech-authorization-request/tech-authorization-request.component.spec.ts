import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAuthorizationRequestComponent } from './tech-authorization-request.component';

describe('TechAuthorizationRequestComponent', () => {
  let component: TechAuthorizationRequestComponent;
  let fixture: ComponentFixture<TechAuthorizationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechAuthorizationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechAuthorizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
