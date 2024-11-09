import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseRequestComponent } from './update-purchase-request.component';

describe('UpdatePurchaseRequestComponent', () => {
  let component: UpdatePurchaseRequestComponent;
  let fixture: ComponentFixture<UpdatePurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
