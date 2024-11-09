import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCreateEmployeeComponent } from './tech-create-employee.component';

describe('TechCreateEmployeeComponent', () => {
  let component: TechCreateEmployeeComponent;
  let fixture: ComponentFixture<TechCreateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCreateEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCreateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
