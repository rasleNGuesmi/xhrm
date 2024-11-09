import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechEnterprisesComponent } from './tech-enterprises.component';

describe('TechEnterprisesComponent', () => {
  let component: TechEnterprisesComponent;
  let fixture: ComponentFixture<TechEnterprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechEnterprisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
