import { Injectable, Inject } from '@angular/core';
import { WINDOW } from 'src/environments/window-provider';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static BACKEND_URL = 'http://192.168.1.123:8080';
  
  constructor(@Inject(WINDOW) private window: Window,) { 
    ConfigService.BACKEND_URL = this.window.location.hostname;
  }

  getBackEndUrl(): string {
    return ConfigService.BACKEND_URL;
  }
}
