import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewHrComponent } from './overview-hr.component';

describe('OverviewHrComponent', () => {
  let component: OverviewHrComponent;
  let fixture: ComponentFixture<OverviewHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
