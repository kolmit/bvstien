import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() parentModel: string = '';

  headerActionsMap: Map<string, any[] > = new Map(); 
  
  constructor(private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    this.headerActionsMap.set('HomepageComponent', 
      [
        { iconPath: '', action: () => {} },
        { iconPath: '', action: () => {} },
        { cssHeaderHeight: '15vh' }
      ]
    );
    this.headerActionsMap.set('BookListComponent',
      [
        { iconPath: '../assets/svg/back.svg', action: () => this.location.back() },
        { iconPath: '', action: () => {} },
        { cssHeaderHeight: '15vh' }
      ]
    );
    this.headerActionsMap.set('BookDetailComponent',
      [
        { iconPath: '../assets/svg/back.svg', action: () => this.location.back() },
        { iconPath: '', action: () => {} },
        { cssHeaderHeight: '30vh' }
      ]
    );
  }

  getMapProperty(index: number, propertyName: string): string {
    return this.parentModel && this.headerActionsMap.get(this.parentModel) ? 
    this.headerActionsMap.get(this.parentModel)[index]?.[propertyName] : '';
  }

  getIcon(index: number): string {
    return this.parentModel && this.headerActionsMap.get(this.parentModel) ? 
      this.headerActionsMap.get(this.parentModel)[index]?.iconPath : '';
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