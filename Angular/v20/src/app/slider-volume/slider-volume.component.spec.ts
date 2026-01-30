import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderVolumeComponent } from './slider-volume.component';

describe('SliderVolumeComponent', () => {
  let component: SliderVolumeComponent;
  let fixture: ComponentFixture<SliderVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
