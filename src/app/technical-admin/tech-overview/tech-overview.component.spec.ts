import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechOverviewComponent } from './tech-overview.component';

describe('TechOverviewComponent', () => {
  let component: TechOverviewComponent;
  let fixture: ComponentFixture<TechOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
