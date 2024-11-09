import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersSecretaryComponent } from './suppliers-secretary.component';

describe('SuppliersSecretaryComponent', () => {
  let component: SuppliersSecretaryComponent;
  let fixture: ComponentFixture<SuppliersSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
