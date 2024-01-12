import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() parentModel: string;

  headerActionsMap: Map<string, { iconPath: string; action: any }[]> = new Map();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.headerActionsMap.set('WorkoutPickerComponent', [
      { iconPath: '../assets/svg/logout.svg', action: () => this.authService.logout() },
      { iconPath: '../assets/svg/gear.svg', action: () => this.navigateToUrl('configure') }
    ]);

    this.headerActionsMap.set('ExercisePickerComponent', [
      { iconPath: '../assets/svg/back.svg', action: () => this.navigateToUrl('workout') }
    ]);

    this.headerActionsMap.set('ConfigurationComponent', [
      { iconPath: '../assets/svg/back.svg', action: () => this.navigateToUrl('workout') }
    ]);
  }

  getIcon(index: number): string {
    return this.parentModel && this.headerActionsMap.get(this.parentModel)
      ? this.headerActionsMap.get(this.parentModel)[index]?.iconPath
      : '';
  }

  /** Permet d'appeler une méthode (redirection, appel de service, ...) définie dans la map */
  doAction(index: number) {
    this.headerActionsMap.get(this.parentModel)[index].action();
  }

  navigateToUrl(url: string) {
    this.router.navigateByUrl('/' + url);
  }

  titleClass(model: string) {
    return model === 'LoginComponent' ? 'big-title' : 'small-title';
  }
}
