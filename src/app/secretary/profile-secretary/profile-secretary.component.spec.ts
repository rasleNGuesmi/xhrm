import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSecretaryComponent } from './profile-secretary.component';

describe('ProfileSecretaryComponent', () => {
  let component: ProfileSecretaryComponent;
  let fixture: ComponentFixture<ProfileSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSecretaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
