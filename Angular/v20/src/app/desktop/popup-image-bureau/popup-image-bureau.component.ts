import {Component, HostListener, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DesktopStreamComponent } from '../desktop-stream/desktop-stream.component';
import { ImageService } from '../../service/image-service.service';
import { PopupToJavaService } from '../../service/popup-to-java.service';

@Component({
  selector: 'app-popup-image-bureau',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    DesktopStreamComponent,
    MatButtonModule
  ],
  templateUrl: './popup-image-bureau.component.html',
  styleUrl: './popup-image-bureau.component.scss'
})
export class PopupImageBureauComponent {
  resize = input<boolean>(false);

  displayKeyboard = false;
  keyboardInputValue = '';
  imageService = inject(ImageService);
  javaService = inject(PopupToJavaService);

  @HostListener('document:keyup', ['$event'])
  keyboardKeyPressed(event: KeyboardEvent): void {
    if (event.isTrusted) {
      this.javaService.typeKeyboardKey(event.key).subscribe();
    }
  }

  toggleKeyboard(): void {
    this.displayKeyboard = !this.displayKeyboard;
  }

  getDesktopBlobUrl() {
    return this.imageService.getDesktopBlobUrl();
  }
}
