import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseNameComponent } from './chose-name.component';

describe('ChoseNameComponent', () => {
  let component: ChoseNameComponent;
  let fixture: ComponentFixture<ChoseNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoseNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoseNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
