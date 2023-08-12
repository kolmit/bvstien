import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimelineAbstractComponent, TimelineDay } from '../timeline-abstract/timeline-abstract.component';

@Component({
  selector: 'app-timeline-picker',
  templateUrl: './timeline-picker.component.html',
  styleUrls: ['./timeline-picker.component.scss'],
})
export class TimelinePickerComponent extends TimelineAbstractComponent {
  pickedDay: TimelineDay;

  @Output()
  chosenDate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {
    super();
    this.pickedDay = this.timelineDays[0];
  }

  pickDay(day: TimelineDay): void {
    this.pickedDay = this.timelineDays.find((dayToFind) => dayToFind.date === day.date);
    this.chosenDate.emit(this.pickedDay.date);
  }

  isPickedDay(day) {
    return day === this.pickedDay;
  }
}
