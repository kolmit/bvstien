import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/service/image-service.service';
import { PopupCameraComponent } from '../popup-camera/popup-camera.component';

@Component({
  selector: 'app-camera-tile',
  templateUrl: './camera-tile.component.html',
  styleUrls: ['./camera-tile.component.css', '../../telecommande/telecommande.component.css']
})
export class CameraTileComponent implements OnInit {

  constructor(
    private dialog: MatDialog, 
    private imageService: ImageService) { }

  ngOnInit() {
  }

  launchWebcam(){
    const dialogRef = this.dialog.open(PopupCameraComponent, {maxWidth: '90%'});

    dialogRef.afterClosed().subscribe(() => {
        this.imageService.closeWebcamStream().subscribe( (res) => { console.log("Caméra fermée : " + res)});
    });
  }
}
