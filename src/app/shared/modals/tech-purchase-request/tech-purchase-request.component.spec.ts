import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPurchaseRequestComponent } from './tech-purchase-request.component';

describe('TechPurchaseRequestComponent', () => {
  let component: TechPurchaseRequestComponent;
  let fixture: ComponentFixture<TechPurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechPurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechPurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
