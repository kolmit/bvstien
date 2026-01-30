import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevisionTileComponent } from './television-tile.component';

describe('TelevisionTileComponent', () => {
  let component: TelevisionTileComponent;
  let fixture: ComponentFixture<TelevisionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelevisionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelevisionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
