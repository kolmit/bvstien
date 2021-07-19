import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPickerComponent } from './workout-picker.component';

describe('WorkoutPickerComponent', () => {
  let component: WorkoutPickerComponent;
  let fixture: ComponentFixture<WorkoutPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
