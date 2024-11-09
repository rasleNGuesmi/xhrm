import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSecretaryComponent } from './overview-secretary.component';

describe('OverviewSecretaryComponent', () => {
  let component: OverviewSecretaryComponent;
  let fixture: ComponentFixture<OverviewSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
