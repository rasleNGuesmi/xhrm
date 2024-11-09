import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersHrComponent } from './suppliers-hr.component';

describe('SuppliersHrComponent', () => {
  let component: SuppliersHrComponent;
  let fixture: ComponentFixture<SuppliersHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
