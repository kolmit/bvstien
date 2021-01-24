import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAlttabComponent } from './popup-alttab.component';

describe('PopupAlttabComponent', () => {
  let component: PopupAlttabComponent;
  let fixture: ComponentFixture<PopupAlttabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAlttabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAlttabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
