import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PopupToJavaService {

  private usersUrl: string;
  private volumeUrl: string;
 
  constructor(private http: HttpClient) {
    this.usersUrl = ConfigService.BACKEND_URL + '/postCmd';
    this.volumeUrl = ConfigService.BACKEND_URL + '/volume';
  }
 
  public findAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.usersUrl);
  }
 
  public save(cmd: Commande) {
    return this.http.post<Commande>(this.usersUrl, cmd);
  }


  public getCurrentVolume() {
    return this.http.get<Commande>(this.volumeUrl);
  }
  public postVolume(cmd: Commande) {
    return this.http.post<Commande>(this.volumeUrl, cmd);
  }
}
