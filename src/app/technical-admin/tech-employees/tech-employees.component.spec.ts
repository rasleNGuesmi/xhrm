import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechEmployeesComponent } from './tech-employees.component';

describe('TechEmployeesComponent', () => {
  let component: TechEmployeesComponent;
  let fixture: ComponentFixture<TechEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
