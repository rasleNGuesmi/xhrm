import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCreateSupplierComponent } from './tech-create-supplier.component';

describe('TechCreateSupplierComponent', () => {
  let component: TechCreateSupplierComponent;
  let fixture: ComponentFixture<TechCreateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechCreateSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechCreateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
