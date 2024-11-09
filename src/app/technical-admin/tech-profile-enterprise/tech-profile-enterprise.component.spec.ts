import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechProfileEnterpriseComponent } from './tech-profile-enterprise.component';

describe('TechProfileEnterpriseComponent', () => {
  let component: TechProfileEnterpriseComponent;
  let fixture: ComponentFixture<TechProfileEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechProfileEnterpriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechProfileEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
