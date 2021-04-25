import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCameraComponent } from './popup-camera.component';

describe('PopupCameraComponent', () => {
  let component: PopupCameraComponent;
  let fixture: ComponentFixture<PopupCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
