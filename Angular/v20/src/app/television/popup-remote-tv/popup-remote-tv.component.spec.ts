import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRemoteTvComponent } from './popup-remote-tv.component';

describe('PopupRemoteTvComponent', () => {
  let component: PopupRemoteTvComponent;
  let fixture: ComponentFixture<PopupRemoteTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRemoteTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRemoteTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
