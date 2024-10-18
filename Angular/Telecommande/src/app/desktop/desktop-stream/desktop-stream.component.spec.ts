import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopStreamComponent } from './desktop-stream.component';

describe('DesktopStreamComponent', () => {
  let component: DesktopStreamComponent;
  let fixture: ComponentFixture<DesktopStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
