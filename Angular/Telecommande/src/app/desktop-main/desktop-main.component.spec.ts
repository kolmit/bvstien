import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMainComponent } from './desktop-main.component';

describe('DesktopMainComponent', () => {
  let component: DesktopMainComponent;
  let fixture: ComponentFixture<DesktopMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
