import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileShutdownComponent } from './tuile-shutdown.component';

describe('TuileShutdownComponent', () => {
  let component: TuileShutdownComponent;
  let fixture: ComponentFixture<TuileShutdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuileShutdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuileShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
