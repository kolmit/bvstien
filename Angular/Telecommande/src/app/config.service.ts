import { Injectable, Inject } from '@angular/core';
import { WINDOW } from 'src/environments/window-provider';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static BACKEND_URL = "http://";
  
  /*constructor(@Inject(WINDOW) private window: Window,) { 
    console.log("INJECT WINDOWS : ", this.window.location.hostname)
    let uri = this.window.location.hostname;
    let port = '8080';
    ConfigService.BACKEND_URL = ConfigService.BACKEND_URL.concat(uri + ":" + port);
    console.log("ConfigService.BACKEND_URL : ", ConfigService.BACKEND_URL);
  }

  getBackEndUrl(): string {
    return ConfigService.BACKEND_URL;
  }*/
}
