import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../service/image-service.service';
import { PopupToJavaService } from '../../service/popup-to-java.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-desktop-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desktop-stream.component.html',
  styleUrl: './desktop-stream.component.scss'
})
export class DesktopStreamComponent implements OnInit {
  resize = input(false);
  updateFrequency = input(750);
  ratioWidth = input(1);
  ratioHeight = input(1);

  imageLoaded = output<void>();

  private readonly imageService = inject(ImageService);
  private readonly javaService = inject(PopupToJavaService);
  private readonly destroyRef = inject(DestroyRef);

  getDesktopBlobUrl() {
    return this.imageService.getDesktopBlobUrl();
  }

  getClickPosition(e: MouseEvent): void {
    const xPosition = e.offsetX;
    const yPosition = e.offsetY;

    this.javaService
      .sendLeftClick(
        xPosition * this.ratioWidth(),
        yPosition * this.ratioHeight()
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  ngOnInit(): void {
    this.imageService
      .startCapture('imageBureau', this.updateFrequency())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.imageLoaded.emit());
  }
}
