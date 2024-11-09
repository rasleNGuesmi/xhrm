import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechUpdateSupplierComponent } from './tech-update-supplier.component';

describe('TechUpdateSupplierComponent', () => {
  let component: TechUpdateSupplierComponent;
  let fixture: ComponentFixture<TechUpdateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechUpdateSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechUpdateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
