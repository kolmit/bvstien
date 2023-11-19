import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Program } from "../model/program.model";
import { Session } from "../model/session.model";
import { Constants } from "../utils/constants";
import { BaseService } from "./base.service";
import { SessionService } from "./session.service";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: "root",
})
export class ProgramService extends BaseService {
  configuredPrograms: Program[] = [];
  allProgramsSubscription: Subscription;
  selectedDefaultProgram: Program;
  
  constructor(
    firestore: AngularFirestore,
    private snackbarService: SnackbarService,
    private sessionService: SessionService
  ) {
    super(firestore);
    if (localStorage.getItem("login") !== null) {
      this.fetchAllPrograms();
    }
  }

  get getConfiguredPrograms(): any[] {
    return this.configuredPrograms;
  }

  saveProgram(exerciseList: string[], programName: string, defaultProgram = false): Promise<void> {
    return this.getUserDataDocuments()
      .collection(Constants.USER_PROGRAMS)
      .doc()
      .set({
        programName: programName,
        programIndex: this.configuredPrograms.length,
        workoutNames: exerciseList,
        selectedProgram: defaultProgram,
      } as Partial<Program>);
  }

  updateProgram(programToUpdate: Partial<Program>): Promise<void> {
    return this.getUserDataDocuments()
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
    for (let workoutName of program.workoutNames) {
      programSessionsMap.set(
        workoutName,
        this.sessionService.getSessionsByWorkout(workoutName)
      );
    }
    return programSessionsMap;
  }

  fetchAllPrograms(): Observable<any> {
    return this.getUserDataDocuments()
      .collection(Constants.USER_PROGRAMS)
      .snapshotChanges()
      .pipe(
        map((allPrograms) => {
          let programsList: Program[] = [];
          allPrograms.map((programMetadata) => {
            let p: Program = programMetadata.payload.doc.data() as Program;
            p.id = programMetadata.payload.doc.id;
            programsList.push(p);
          });
          this.configuredPrograms = programsList.sort(
            (pa, pb) => pa.programIndex - pb.programIndex
          );

          if (this.configuredPrograms.find((p) => p.selectedProgram)?.programIndex >= 0) {
            // programIndex+1 car l'onglet "+" est à index=0
            //this.setProgramSelected(this.configuredPrograms.find((p) => p.selectedProgram) ?.programIndex + 1);
            this.selectedDefaultProgram = this.configuredPrograms.find((p) => p.selectedProgram);
          }
          return this.configuredPrograms;
        })
      );
  }

  addWorkoutToProgram(workoutName: string, programId: string) {
    const programToUpdate = this.configuredPrograms.find(
      (p) => p.id === programId
    );
    const isWorkoutNotAlreadyAdded =
      programToUpdate?.workoutNames.findIndex(
        (w) => w.toUpperCase() === workoutName.toUpperCase()
      ) === -1;

    if (isWorkoutNotAlreadyAdded) {
      programToUpdate.workoutNames.push(workoutName);
      this.updateProgram(programToUpdate);
    } else {
      this.snackbarService.openSnackBar("Ce muscle est déjà dans ce programme");
    }
  }

  deleteWorkoutFromProgram(workoutName: string, programId: string) {
    const programToUpdate = this.configuredPrograms.find(
      (p) => p.id === programId
    );
    const workoutIndexToDeleteFromProgram =
      programToUpdate.workoutNames.findIndex(
        (w) => w.toUpperCase() === workoutName.toUpperCase()
      );

    if (workoutIndexToDeleteFromProgram >= 0) {
      programToUpdate.workoutNames.splice(workoutIndexToDeleteFromProgram, 1);
      this.updateProgram(programToUpdate);
    }
  }

  updateProgramSelectedByDefault(newProgramSelected: Program) {
    this.selectedDefaultProgram.selectedProgram = false;
    this.updateProgram(this.selectedDefaultProgram)
    .then(() => {
      newProgramSelected.selectedProgram = true;
      this.updateProgram(newProgramSelected)
      .then(() => {
        this.selectedDefaultProgram = newProgramSelected;
      });
    });
  }
}