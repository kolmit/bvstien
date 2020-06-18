import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteVolumeComponent } from './mute-volume.component';

describe('MuteVolumeComponent', () => {
  let component: MuteVolumeComponent;
  let fixture: ComponentFixture<MuteVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuteVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuteVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
