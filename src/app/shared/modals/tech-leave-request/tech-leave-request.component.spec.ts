import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechLeaveRequestComponent } from './tech-leave-request.component';

describe('TechLeaveRequestComponent', () => {
  let component: TechLeaveRequestComponent;
  let fixture: ComponentFixture<TechLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechLeaveRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
