import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechRequestsComponent } from './tech-requests.component';

describe('TechRequestsComponent', () => {
  let component: TechRequestsComponent;
  let fixture: ComponentFixture<TechRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
