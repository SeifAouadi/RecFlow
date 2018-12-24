import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCComponent } from './profile-c.component';

describe('ProfileCComponent', () => {
  let component: ProfileCComponent;
  let fixture: ComponentFixture<ProfileCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
