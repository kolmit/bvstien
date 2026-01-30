import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocalTileComponent } from './vocal-tile.component';

describe('VocalComponent', () => {
  let component: VocalTileComponent;
  let fixture: ComponentFixture<VocalTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocalTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocalTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
