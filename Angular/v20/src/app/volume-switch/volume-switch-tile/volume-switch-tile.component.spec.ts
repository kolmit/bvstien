import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeSwitchTileComponent } from './volume-switch-tile.component';

describe('VolumeSwitchTileComponent', () => {
  let component: VolumeSwitchTileComponent;
  let fixture: ComponentFixture<VolumeSwitchTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeSwitchTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSwitchTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
