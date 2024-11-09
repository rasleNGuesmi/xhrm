import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAuthLayoutComponent } from './tech-auth-layout.component';

describe('TechAuthLayoutComponent', () => {
  let component: TechAuthLayoutComponent;
  let fixture: ComponentFixture<TechAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechAuthLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
