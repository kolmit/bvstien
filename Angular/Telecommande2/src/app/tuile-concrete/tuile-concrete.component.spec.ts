import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileConcreteComponent } from './tuile-concrete.component';

describe('TuileConcreteComponent', () => {
  let component: TuileConcreteComponent;
  let fixture: ComponentFixture<TuileConcreteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuileConcreteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuileConcreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
