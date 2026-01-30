import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PopupToJavaService } from '../service/popup-to-java.service';

@Component({
  selector: 'app-vocal-tile',
  templateUrl: './vocal-tile.component.html',
  styleUrls: ['./vocal-tile.component.css', '../telecommande/telecommande.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule]
})
export class VocalTileComponent {
  keyboardInputValue: string = '';
  inputDisplayed: boolean = true;
  commandTimer: ReturnType<typeof setTimeout> | null = null;
  @ViewChild('vocalCommandInput', {static: false}) vocalCommandInput!: ElementRef<any>;
  @ViewChild('vocalTile', {static: false}) vocalTile!: ElementRef<any>;

  constructor(private javaService: PopupToJavaService) { }

  listen(){
    this.vocalCommandInput.nativeElement.focus();
  }

  onModelChange(_value: string) {
    if (this.commandTimer) {
      clearTimeout(this.commandTimer);
    }

    this.commandTimer = setTimeout( () => {

      this.javaService.sendVocalCommand(this.keyboardInputValue)
      .subscribe((executed) => {
          const responseClass = executed ? 'animation-valid-response' : 'animation-invalid-response'
          this.vocalTile.nativeElement.classList.add(responseClass);
          setTimeout(() => { this.vocalTile.nativeElement.classList.remove(responseClass) }, 2000);

          this.keyboardInputValue = '';
      });
    }, 1500)
  }
}
