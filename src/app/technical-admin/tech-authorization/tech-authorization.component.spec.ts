import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAuthorizationComponent } from './tech-authorization.component';

describe('TechAuthorizationComponent', () => {
  let component: TechAuthorizationComponent;
  let fixture: ComponentFixture<TechAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
