import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSecretaryComponent } from './dashboard-secretary.component';

describe('DashboardSecretaryComponent', () => {
  let component: DashboardSecretaryComponent;
  let fixture: ComponentFixture<DashboardSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
