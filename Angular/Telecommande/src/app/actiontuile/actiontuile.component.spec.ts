import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiontuileComponent } from './actiontuile.component';

describe('ActiontuileComponent', () => {
  let component: ActiontuileComponent;
  let fixture: ComponentFixture<ActiontuileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiontuileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiontuileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
