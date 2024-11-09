import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAuthorizationComponent } from './delete-authorization.component';

describe('DeleteAuthorizationComponent', () => {
  let component: DeleteAuthorizationComponent;
  let fixture: ComponentFixture<DeleteAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
