import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupYoutubeComponent } from './popup-youtube.component';

describe('PopupYoutubeComponent', () => {
  let component: PopupYoutubeComponent;
  let fixture: ComponentFixture<PopupYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
