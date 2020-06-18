import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';
import { ConfigService } from '../config.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageUrl: string;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private configService: ConfigService) {
    this.imageUrl = this.configService.getBackEndUrl() + '/imageBureau';
  }
 
  public getImageBureau(): Observable<Blob> {
    return this.http.get(this.imageUrl, { responseType: 'blob' });
  }
}
