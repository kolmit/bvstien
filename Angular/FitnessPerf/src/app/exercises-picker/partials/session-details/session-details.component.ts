import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Exercise } from 'src/app/model/exercise.model';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit, OnChanges {
  @Output()
  closeDetails: EventEmitter<boolean> = new EventEmitter();
  
  @Input()
  session: Session;
  sessionWithoutEmptyExo: Session;

  @Input() 
  fromHistory = false;

  sessionWithoutEmptyExercises: Session;

  totalSetsNumber: number = 0;
  totalExercisesNumber: number = 0;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.session.currentValue) {
      console.log('changes sessiondetails', changes)
      this.computeGeneralInformations(changes.session.currentValue);
    }
  }
  
  ngOnInit(): void {
  }

  computeGeneralInformations(sessionChanged: Session) {
    this.sessionWithoutEmptyExo = JSON.parse(JSON.stringify(this.session));
    this.sessionWithoutEmptyExo.workout.exercises = sessionChanged.workout.exercises.filter(exercise => exercise.sets?.length > 0);
    this.totalExercisesNumber = this.sessionWithoutEmptyExo.workout.exercises.length;
    this.sessionWithoutEmptyExo.workout.exercises.map(e => this.totalSetsNumber += e.sets.length);
  }

  back() {
    this.closeDetails.emit(true);
  }

}
