import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsHrComponent } from './requests-hr.component';

describe('RequestsHrComponent', () => {
  let component: RequestsHrComponent;
  let fixture: ComponentFixture<RequestsHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsHrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
