import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static BACKEND_URL = 'http://192.168.1.123:8080';
  
  constructor() { }
}
