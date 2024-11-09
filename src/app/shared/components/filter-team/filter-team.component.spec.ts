import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTeamComponent } from './filter-team.component';

describe('FilterTeamComponent', () => {
  let component: FilterTeamComponent;
  let fixture: ComponentFixture<FilterTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
