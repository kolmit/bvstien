import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopTileComponent } from './desktop-tile.component';

describe('DesktopTileComponent', () => {
  let component: DesktopTileComponent;
  let fixture: ComponentFixture<DesktopTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
