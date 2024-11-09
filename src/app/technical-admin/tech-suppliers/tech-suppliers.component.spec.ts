import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSuppliersComponent } from './tech-suppliers.component';

describe('TechSuppliersComponent', () => {
  let component: TechSuppliersComponent;
  let fixture: ComponentFixture<TechSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechSuppliersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
