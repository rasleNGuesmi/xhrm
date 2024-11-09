import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsSecretaryComponent } from './requests-secretary.component';

describe('RequestsSecretaryComponent', () => {
  let component: RequestsSecretaryComponent;
  let fixture: ComponentFixture<RequestsSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
