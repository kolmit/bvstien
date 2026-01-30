import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupShutdownComponent } from './popup-shutdown.component';

describe('PopupContentComponent', () => {
  let component: PopupShutdownComponent;
  let fixture: ComponentFixture<PopupShutdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupShutdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
