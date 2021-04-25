import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShutdownTileComponent } from './shutdown-tile.component';

describe('ShutdownTileComponent', () => {
  let component: ShutdownTileComponent;
  let fixture: ComponentFixture<ShutdownTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShutdownTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShutdownTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
