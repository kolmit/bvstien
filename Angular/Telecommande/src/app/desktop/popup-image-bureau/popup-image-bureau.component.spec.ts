import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImageBureauComponent } from './popup-image-bureau.component';

describe('PopupImageBureauComponent', () => {
  let component: PopupImageBureauComponent;
  let fixture: ComponentFixture<PopupImageBureauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupImageBureauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupImageBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
