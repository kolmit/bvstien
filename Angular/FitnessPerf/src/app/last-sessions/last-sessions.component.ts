import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Session } from '../model/session.model';
import { SnackbarService } from '../services/snackbar.service';
import { StorageService } from '../services/storage.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-last-sessions',
  templateUrl: './last-sessions.component.html',
  styleUrls: ['./last-sessions.component.scss']
})
export class LastSessionsComponent implements OnInit {
  currentSessionIndex: number;
  myWorkout: string;
  allLastSessions: Session[] = [];

  ngOnInit(): void { }

  constructor(
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<LastSessionsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { myWorkout: string }
  ) {
      this.myWorkout = data.myWorkout;
      this.getSessionHistory(this.myWorkout);
    }

  closeDialog() {
    this.dialogRef.close();
  }

  
  getSessionHistory(myWorkout: string) {
    this.storageService.getAllSessionByWorkout(myWorkout)
    .subscribe( (allLastSessions) => {
        this.allLastSessions = Utils.sortSessionsByDate(allLastSessions);
        this.currentSessionIndex = this.allLastSessions?.length - 1;
      });
  }

  // Change de session et renvoie si la session existe ou non
  switchSession(addToIndex: number): boolean {
    const index = this.currentSessionIndex + addToIndex;
    const sessionExist: boolean = (this.allLastSessions[index] != undefined);

    if (sessionExist) {
      this.currentSessionIndex = index;
    }  
    return sessionExist;
  }

  /** Pour faire disparaitre les "Avant" / "Après" */
  isSessionIndexExisting(addToIndex: number): boolean {
    return (this.allLastSessions[this.currentSessionIndex + addToIndex] != undefined);
  }

  deleteThisSession(indexToDelete: number){
    this.storageService.delete(this.allLastSessions[indexToDelete])
      .then(() => {
        this.snackbarService.openSnackBar("Séance supprimée.", "✔");
        this.closeDialog();
      }).catch((err) => {
        this.snackbarService.openSnackBar("Problème lors de la suppression de la séance.", err);
      });
  }
}
