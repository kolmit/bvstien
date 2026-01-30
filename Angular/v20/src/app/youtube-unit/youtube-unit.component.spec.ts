import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeUnitComponent } from './youtube-unit.component';

describe('YoutubeUnitComponent', () => {
  let component: YoutubeUnitComponent;
  let fixture: ComponentFixture<YoutubeUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
