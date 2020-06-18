import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PopupToJavaService {


  private shutdownUrl: string;
  private volumeUrl: string;
  private muteUrl: string;
  private isMutedUrl: string;
  private tvUrl: string;
  private youtubeVideo: string;
  private switchPause: string;
  private fullScreen: string;
  private closeTab: string;
  private currentMedia: string;
  private switchMonitor: string;
  private leftClick: string;

  constructor(private http: HttpClient) {
    this.shutdownUrl = ConfigService.BACKEND_URL + '/shutdown';
    this.volumeUrl = ConfigService.BACKEND_URL + '/volume';
    this.isMutedUrl = ConfigService.BACKEND_URL + '/muted';
    this.muteUrl = ConfigService.BACKEND_URL + '/muteVolume';
    this.tvUrl = ConfigService.BACKEND_URL + '/tv';
    this.youtubeVideo = ConfigService.BACKEND_URL + '/youtube';
    this.switchPause = ConfigService.BACKEND_URL + '/switchPause';
    this.fullScreen = ConfigService.BACKEND_URL + '/fullscreen';
    this.closeTab = ConfigService.BACKEND_URL + '/closeCurrentChromeTab';
    this.currentMedia = ConfigService.BACKEND_URL + '/currentMedia';
    this.switchMonitor = ConfigService.BACKEND_URL + '/switchMonitor';
    this.leftClick = ConfigService.BACKEND_URL + '/leftclick';
  }

  public manageShutdown(cmd: Commande): Observable<number> {
    return this.http.post<number>(this.shutdownUrl, cmd);
  }

  public getCurrentVolume(): Observable<number> {
    return this.http.get<number>(this.volumeUrl);
  }

  public postVolume(cmd: Commande): Observable<number> {
    return this.http.post<number>(this.volumeUrl, cmd);
  }

  public postMute(cmd: Commande): Observable<boolean> {
    return this.http.post<boolean>(this.muteUrl, cmd);
  }

  public getMute() {
    return this.http.get<boolean>(this.isMutedUrl);
  }

  public getYoutubeVideo(idVideo: string) {
    return this.http.get<string>(this.youtubeVideo + "?idVideo=" + idVideo)
      .subscribe(
        (res) => {
          console.log("Youtube: " + res);
        },
        (err) => {
          console.error("Erreur youtube !");
        }
    );
  }

  // TODO : En faire une méthode POST
  public getTvChannel(chaineTv: String) {
    let channelRequested = this.tvUrl.valueOf();
    channelRequested = channelRequested.concat("?chaine=" + chaineTv);

    return this.http.get<boolean>(channelRequested).subscribe(
      () => console.log("Chaine mise : " + chaineTv),
      (err) => console.log("erreur chaine tv")
    );
  }

  getCurrentMedia(): Observable<string> {
    return this.http.get(this.currentMedia, {responseType: 'text'});
  }

  getSwitchPause(): Observable<boolean>  {
    return this.http.get<boolean>(this.switchPause);
  }

  postFullScreen(): Observable<Object>  {
    return this.http.post(this.fullScreen, [{"fullscreen":"on"}]);
  }

  getCloseTab(): Observable<boolean>   {
    return this.http.get<boolean>(this.closeTab);
  }

  getSwitchMonitor(): Observable<boolean> {
    return this.http.get<boolean>(this.switchMonitor);
  }

  sendLeftClick(xPosition: any, yPosition: any): Observable<Object> {
    console.log("rho click", xPosition);
    let params = {"xPosition":xPosition, "yPosition": yPosition };
    return this.http.post<any>(this.leftClick, params);
  }

  /*getRemoteStatus(): Observable<Object> {
    this.http.get<boolean>(this.isFullScreen)
  }*/
}
