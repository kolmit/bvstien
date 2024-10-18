import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PopupToJavaService } from '../service/popup-to-java.service';

@Component({
  selector: 'app-vocal-tile',
  templateUrl: './vocal-tile.component.html',
  styleUrls: ['./vocal-tile.component.css', '../telecommande/telecommande.component.css']
})
export class VocalTileComponent {
  keyboardInputValue: string = '';
  inputDisplayed: boolean = true;
  commandTimer: any;
  @ViewChild('vocalCommandInput') vocalCommandInput: ElementRef<any>;
  @ViewChild('vocalTile') vocalTile: ElementRef<any>;

  constructor(private javaService: PopupToJavaService) { }

  listen(){
    this.vocalCommandInput.nativeElement.focus();
  }

  onModelChange(e) {
    clearTimeout(this.commandTimer);

    this.commandTimer = setTimeout( () => {

      this.javaService.sendVocalCommand(this.keyboardInputValue)
      .subscribe((executed) => {
          const responseClass = executed === true ? 'animation-valid-response' : 'animation-invalid-response'
          this.vocalTile.nativeElement.classList.add(responseClass);
          setTimeout(() => { this.vocalTile.nativeElement.classList.remove(responseClass) }, 2000);
          
          this.keyboardInputValue = '';
      });
    }, 1500)
  }
}