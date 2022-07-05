import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Program } from '../model/program.model';
import { Constants } from '../utils/constants';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseService {
  configuredPrograms: Program[] = [];
  allProgramsSubscription: Subscription;
  selectedProgramTab: any;

  constructor(firestore: AngularFirestore) {
    super(firestore);
    if (localStorage.getItem('login') !== null) {
      this.fetchAllPrograms();
    }
  }

  get getConfiguredPrograms(): any[] {
    return this.configuredPrograms;
  }

  saveProgram(exerciseList: string[], programIndex: number, programName: string) {
    let programToSave: Program = {
      programName: programName,
      programIndex: programIndex, 
      workoutNames: exerciseList, 
      selectedProgram: false
    };

    this.getUserDataDocuments()
        .collection(Constants.USER_PROGRAMS)
        .doc(programName)
        .set(programToSave);
  }

  updateProgram(programToUpdate: Partial<Program>) {
    this.getUserDataDocuments()
        .collection(Constants.USER_PROGRAMS)
        .doc(programToUpdate.programName)
        .update(programToUpdate);
  }

  fetchAllPrograms(): Observable<any> {
    return this.getUserDataDocuments()
      .collection(Constants.USER_PROGRAMS)
      .valueChanges()
      .pipe(
        map((allPrograms) => {
          this.configuredPrograms = (allPrograms as Program[]).sort((pa, pb) => pa.programIndex - pb.programIndex);
          return this.configuredPrograms;
        })
      );
  }

  addWorkoutToProgram(workoutName: string, programIndex: number, programName: string) {
    if (this.configuredPrograms[programIndex]) {
      this.saveProgram([...this.configuredPrograms[programIndex].workoutNames, workoutName], programIndex, programName);
    }
  }

  deleteWorkoutFromProgram(workoutName: string, programIndex: number) {
    const programToUpdate = this.configuredPrograms[programIndex];
    const workoutIndexToDeleteFromProgram = programToUpdate.workoutNames.findIndex(w => w.toUpperCase() === workoutName.toUpperCase());

    if (workoutIndexToDeleteFromProgram >= 0) {
      programToUpdate.workoutNames.splice(workoutIndexToDeleteFromProgram, 1);
      this.updateProgram(programToUpdate);
    }
  }

  setProgramSelected(tabIndex: number) {
    this.selectedProgramTab = tabIndex;
  }
}