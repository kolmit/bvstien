import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Program } from '../model/program.model';
import { Session } from '../model/session.model';
import { Constants } from '../utils/constants';
import { BaseService } from './base.service';
import { SessionService } from './session.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseService {
  configuredPrograms: Program[] = [];
  allProgramsSubscription: Subscription;
  selectedProgramTab: any;
  selectedProgramTabChanged: Subject<number> = new Subject();

  constructor(
    firestore: AngularFirestore, 
    private snackbarService: SnackbarService,
    private sessionService: SessionService) 
  {
    super(firestore);
    if (localStorage.getItem('login') !== null) {
      this.fetchAllPrograms();
    }
  }

  get getConfiguredPrograms(): any[] {
    return this.configuredPrograms;
  }

  saveProgram(exerciseList: string[], programName: string): Promise<void> {
    return this.getUserDataDocuments()
        .collection(Constants.USER_PROGRAMS)
        .doc()
        .set({
          programName: programName,
          programIndex: this.configuredPrograms.length, 
          workoutNames: exerciseList, 
          selectedProgram: false
        } as Partial<Program>);
  }

  saveProgramV2(workoutListId: string[], programName: string): Promise<void> {
    return this.getUserDataDocuments()
        .collection(Constants.USER_PROGRAMS)
        .doc()
        .set({
          programName: programName,
          programIndex: this.configuredPrograms.length, 
          workoutIds: workoutListId, 
          selectedProgram: false
        } as Partial<Program>);
  }

  updateProgram(programToUpdate: Partial<Program>) {
    this.getUserDataDocuments()
        .collection(Constants.USER_PROGRAMS)
        .doc(programToUpdate.id)
        .update(programToUpdate);
  }

  deleteProgram(program: Program) {
    this.getUserDataDocuments()
        .collection(Constants.USER_PROGRAMS)
        .doc(program.id)
        .delete();
  }

  getSessionsByProgram(program: Program): Map<string, Session[]> {
    let programSessionsMap: Map<string, Session[]> = new Map();
    for (let workoutId of program.workoutIds) {
      programSessionsMap.set(workoutId, this.sessionService.getSessionsByWorkout(workoutId));
    }
    return programSessionsMap;
  }

  fetchAllPrograms(): Observable<any> {
    return this.getUserDataDocuments()
      .collection(Constants.USER_PROGRAMS)
      .snapshotChanges()
      .pipe(
        map(
          (allPrograms) => {
            let programsList: Program[] = [];
            allPrograms.map(programMetadata => {
              let p: Program = programMetadata.payload.doc.data() as Program;
              p.id = programMetadata.payload.doc.id;
              programsList.push(p);
            });
            this.configuredPrograms = programsList.sort((pa, pb) => pa.programIndex - pb.programIndex);

            if (this.configuredPrograms.find(p => p.selectedProgram)?.programIndex >= 0) {
              // programIndex+1 car l'onglet "+" est à index=0
              this.setProgramSelected(this.configuredPrograms.find(p => p.selectedProgram)?.programIndex + 1);
            }
            return this.configuredPrograms;
          })
      );
  }

  /*addWorkoutToProgram(workoutName: string, programId: string) {
    const programToUpdate = this.configuredPrograms.find(p => p.id === programId);
    const isWorkoutNotAlreadyAdded = programToUpdate?.workoutNames.findIndex(w => w.toUpperCase() === workoutName.toUpperCase()) === -1;

    if (isWorkoutNotAlreadyAdded) {
      programToUpdate.workoutNames.push(workoutName);
      this.updateProgram(programToUpdate);
    } else {
      this.snackbarService.openSnackBar('Ce muscle est déjà dans ce programme');
    }
  }

  deleteWorkoutFromProgram(workoutName: string, programId: string) {
    const programToUpdate = this.configuredPrograms.find(p => p.id === programId)
    const workoutIndexToDeleteFromProgram = programToUpdate.workoutNames.findIndex(w => w.toUpperCase() === workoutName.toUpperCase());

    if (workoutIndexToDeleteFromProgram >= 0) {
      programToUpdate.workoutNames.splice(workoutIndexToDeleteFromProgram, 1);
      this.updateProgram(programToUpdate);
    }
  }*/

  setProgramSelected(tabIndex: number) {
    this.selectedProgramTab = tabIndex;
    this.selectedProgramTabChanged.next(this.selectedProgramTab);
  }

  /**
   * Met à jour le nouveau programme sélectionné (permet à l'user de tjrs être sur le même onglet, même entre 2)
   */
  switchProgramSelectedByDefault(oldSelectedProgram: Program, newSelectedProgram: Program) {
    oldSelectedProgram.selectedProgram = false;
    //this.updateProgram(oldSelectedProgram);

    newSelectedProgram.selectedProgram = true;
    //this.updateProgram(newSelectedProgram);
    this.setProgramSelected(newSelectedProgram.programIndex);
  }
}