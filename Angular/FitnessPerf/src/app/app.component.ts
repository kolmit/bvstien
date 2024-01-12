import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FitnessPerfs';

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event): void {
    // Forcer l'orientation en mode portrait
    if (window.screen.orientation) {
      (window.screen.orientation as any).lock('portrait');
    }
  }
}
