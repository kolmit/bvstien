import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupContentVolumeComponent } from './popup-content-volume.component';

describe('PopupContentVolumeComponent', () => {
  let component: PopupContentVolumeComponent;
  let fixture: ComponentFixture<PopupContentVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupContentVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupContentVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
