import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClokingComponent } from './cloking.component';

describe('ClokingComponent', () => {
  let component: ClokingComponent;
  let fixture: ComponentFixture<ClokingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClokingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClokingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
