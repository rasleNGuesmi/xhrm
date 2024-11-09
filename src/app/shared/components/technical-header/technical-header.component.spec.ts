import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalHeaderComponent } from './technical-header.component';

describe('TechnicalHeaderComponent', () => {
  let component: TechnicalHeaderComponent;
  let fixture: ComponentFixture<TechnicalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
