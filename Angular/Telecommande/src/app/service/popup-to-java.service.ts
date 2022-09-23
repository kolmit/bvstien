import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopupToJavaService {

  private shutdownUrl: string;
  private shutdownCancelUrl: string;
  private volumeUrl: string;
  private muteUrl: string;
  private isMutedUrl: string;
  private tvUrl: string;
  private youtubeVideo: string;
  private netflixTab: string;
  private switchPause: string;
  private fullScreen: string;
  private closeTab: string;
  private currentMedia: string;
  private switchMonitor: string;
  private leftClick: string;
  private pressKeyboardKey: string;
  private switchSoundDeviceUrl: string;
  private vocalCommandUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.shutdownUrl = environment.BACKEND_URL + '/shutdown';
    this.shutdownCancelUrl = environment.BACKEND_URL + '/shutdown/cancel';
    this.volumeUrl = environment.BACKEND_URL + '/volume';
    this.isMutedUrl = environment.BACKEND_URL + '/muted';
    this.muteUrl = environment.BACKEND_URL + '/muteVolume';
    this.switchSoundDeviceUrl = environment.BACKEND_URL + '/switchSoundDevice';
    this.tvUrl = environment.BACKEND_URL + '/tv';
    this.youtubeVideo = environment.BACKEND_URL + '/youtube';
    this.netflixTab = environment.BACKEND_URL + '/netflix';
    this.switchPause = environment.BACKEND_URL + '/switchPause';
    this.fullScreen = environment.BACKEND_URL + '/fullscreen';
    this.closeTab = environment.BACKEND_URL + '/closeCurrentChromeTab';
    this.currentMedia = environment.BACKEND_URL + '/currentMedia';
    this.switchMonitor = environment.BACKEND_URL + '/switchMonitor';
    this.leftClick = environment.BACKEND_URL + '/leftclick';
    this.pressKeyboardKey = environment.BACKEND_URL + '/pressKeyboardKey';
    this.vocalCommandUrl = environment.BACKEND_URL + '/vocalCommand';
  }

  public manageShutdown(time: number, isShutdown: boolean): Observable<number> {
    let command: any = { isShutdown: isShutdown, time: time}
    return this.http.post<number>(this.shutdownUrl, command);
  }

  public cancelShutdown(): Observable<boolean> {
    return this.http.get<boolean>(this.shutdownCancelUrl);
  }

  public getShutdownCount(): Observable<number> {
    return this.http.get<number>(this.shutdownUrl);
  }

  public getCurrentVolume(): Observable<number> {
    return this.http.get<number>(this.volumeUrl);
  }

  public postVolume(cmd: string): Observable<number> {
    return this.http.post<number>(this.volumeUrl, cmd);
  }

  public getSwitchSoundDevice(): Observable<Object> {
    return this.http.get<Object>(this.switchSoundDeviceUrl);
  }

  public postMute(muteOrUnmute: string): Observable<boolean> {
    return this.http.post<boolean>(this.muteUrl, muteOrUnmute);
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

  public openNetflixTab() {
    return this.http.get<boolean>(this.netflixTab);
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

  sendVocalCommand(cmd: string): Observable<boolean> {
    return this.http.post<any>(this.vocalCommandUrl, cmd);
  }
}
