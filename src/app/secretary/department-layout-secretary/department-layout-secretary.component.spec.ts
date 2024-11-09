import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentLayoutSecretaryComponent } from './department-layout-secretary.component';

describe('DepartmentLayoutSecretaryComponent', () => {
  let component: DepartmentLayoutSecretaryComponent;
  let fixture: ComponentFixture<DepartmentLayoutSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentLayoutSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentLayoutSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
