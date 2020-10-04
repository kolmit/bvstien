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
  private pressKeyboardKey: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.shutdownUrl = this.configService.getBackEndUrl() + '/shutdown';
    this.volumeUrl = this.configService.getBackEndUrl() + '/volume';
    this.isMutedUrl = this.configService.getBackEndUrl() + '/muted';
    this.muteUrl = this.configService.getBackEndUrl() + '/muteVolume';
    this.tvUrl = this.configService.getBackEndUrl() + '/tv';
    this.youtubeVideo = this.configService.getBackEndUrl() + '/youtube';
    this.switchPause = this.configService.getBackEndUrl() + '/switchPause';
    this.fullScreen = this.configService.getBackEndUrl() + '/fullscreen';
    this.closeTab = this.configService.getBackEndUrl() + '/closeCurrentChromeTab';
    this.currentMedia = this.configService.getBackEndUrl() + '/currentMedia';
    this.switchMonitor = this.configService.getBackEndUrl() + '/switchMonitor';
    this.leftClick = this.configService.getBackEndUrl() + '/leftclick';
    this.pressKeyboardKey = this.configService.getBackEndUrl() + '/pressKeyboardKey';
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
          console.log("Youtube: ", res);
        },
        (error) => {
          console.error("Erreur youtube !", error);
        }
    );
  }

  // TODO : En faire une méthode POST
  public getTvChannel(chaineTv: String) {
    let channelRequested = this.tvUrl.valueOf();
    channelRequested = channelRequested.concat("?chaine=" + chaineTv);

    return this.http.get<boolean>(channelRequested).subscribe(
      () => console.log("Chaine mise : " + chaineTv),
      (err) => console.error("erreur chaine tv")
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
    let params = {"xPosition":xPosition, "yPosition": yPosition };
    return this.http.post<any>(this.leftClick, params);
  }

  typeKeyboardKey(key: string): Observable<string>  {
    return this.http.post<any>(this.pressKeyboardKey, key);
  }
}
