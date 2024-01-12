import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceDialogComponent } from './multi-choice-dialog.component';

describe('MultiChoiceDialogComponent', () => {
  let component: MultiChoiceDialogComponent;
  let fixture: ComponentFixture<MultiChoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiChoiceDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
