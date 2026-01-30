import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {PopupToJavaService} from '../../service/popup-to-java.service';
import {StateService} from '../../service/state.service';

@Component({
    selector: 'app-popup-shutdown',
    templateUrl: './popup-shutdown.component.html',
    styleUrls: ['./popup-shutdown.component.css'],
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ScrollingModule]
})
export class PopupShutdownComponent {
    heures: string[] = [];

    heureSelected: string | null = null;
    shutdownTimeRequested: number | null = null;
    isShutdown = true;


    constructor(private javaService: PopupToJavaService,
                public stateService: StateService,
                public dialogRef: MatDialogRef<PopupShutdownComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        if (data.shutdownCountdown != undefined) {
            this.shutdownTimeRequested = data.shutdownCountdown;
        }
        this.heures = this.generateQuartDheure();
    }


    onSubmitShutdown() {
        const seconds = this.isShutdown ? this.convertHeureToSeconde() : 0;
        if (seconds === null) {
            return;
        }

        this.javaService.manageShutdown(seconds, this.isShutdown).subscribe(result => {
            this.shutdownTimeRequested = result;
            this.stateService.setShutdownActive(true);
            this.stateService.fetchShutdownState();
        });
        this.shutdownTimeRequested = seconds;
        this.heureSelected = null;
    }

    onSubmitCancel() {
        this.javaService.cancelShutdown()
            .subscribe(() => {
                this.stateService.setShutdownActive(false);
            });
        this.shutdownTimeRequested = null;
    }

    selectionnerHeure(choix: string) {
        this.heureSelected = choix;
    }

    generateQuartDheure(): string[] {
        const quartHeure: string[] = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 4; m++) {
                const minutes = m == 0 ? '00' : m * 15;
                quartHeure.push(h + ':' + minutes);
            }
        }

        return quartHeure;
    }

    convertHeureToSeconde(): number | null {
        if (this.heureSelected == undefined) {
            return null;
        }
        const heureMinutes = this.heureSelected.split(":");
        const nbSecondes = Number(heureMinutes[0]) * 3600 + Number(heureMinutes[1]) * 60;

        this.shutdownTimeRequested = nbSecondes;
        return nbSecondes;
    }


    displayCountdown() {
        this.javaService.getShutdownCount().subscribe((res) => {
            console.log(res);
        });
    }

    shutdownAction(isShutdownAction: boolean) {
        this.isShutdown = isShutdownAction;
    }
}
