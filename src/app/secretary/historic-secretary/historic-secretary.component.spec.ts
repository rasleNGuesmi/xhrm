import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricSecretaryComponent } from './historic-secretary.component';

describe('HistoricSecretaryComponent', () => {
  let component: HistoricSecretaryComponent;
  let fixture: ComponentFixture<HistoricSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
