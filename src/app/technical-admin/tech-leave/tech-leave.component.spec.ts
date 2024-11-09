import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechLeaveComponent } from './tech-leave.component';

describe('TechLeaveComponent', () => {
  let component: TechLeaveComponent;
  let fixture: ComponentFixture<TechLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
