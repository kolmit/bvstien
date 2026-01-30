import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ShutdownCommand {
  isShutdown: boolean;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class PopupToJavaService {
  private shutdownUrl = environment.BACKEND_URL + '/shutdown';
  private shutdownCancelUrl = environment.BACKEND_URL + '/shutdown/cancel';
  private volumeUrl = environment.BACKEND_URL + '/volume';
  private muteUrl = environment.BACKEND_URL + '/muteVolume';
  private isMutedUrl = environment.BACKEND_URL + '/muted';
  private tvUrl = environment.BACKEND_URL + '/tv';
  private youtubeVideo = environment.BACKEND_URL + '/youtube';
  private netflixTab = environment.BACKEND_URL + '/netflix';
  private switchPause = environment.BACKEND_URL + '/switchPause';
  private fullScreen = environment.BACKEND_URL + '/fullscreen';
  private closeTab = environment.BACKEND_URL + '/closeCurrentChromeTab';
  private currentMedia = environment.BACKEND_URL + '/currentMedia';
  private switchMonitor = environment.BACKEND_URL + '/switchMonitor';
  private leftClick = environment.BACKEND_URL + '/leftclick';
  private pressKeyboardKey = environment.BACKEND_URL + '/pressKeyboardKey';
  private switchSoundDeviceUrl = environment.BACKEND_URL + '/switchSoundDevice';
  private vocalCommandUrl = environment.BACKEND_URL + '/vocalCommand';

  constructor(private http: HttpClient) {}

  public manageShutdown(time: number, isShutdown: boolean): Observable<number> {
    const command: ShutdownCommand = { isShutdown, time };
    return this.http.post<ShutdownCommand>(this.shutdownUrl, command).pipe(
      map((shutdownCmd) => shutdownCmd.time)
    );
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

  public getSwitchSoundDevice(): Observable<unknown> {
    return this.http.get(this.switchSoundDeviceUrl);
  }

  public postMute(muteOrUnmute: string): Observable<boolean> {
    return this.http.post<boolean>(this.muteUrl, muteOrUnmute);
  }

  public getMute(): Observable<boolean> {
    return this.http.get<boolean>(this.isMutedUrl);
  }

  public getYoutubeVideo(idVideo: string): void {
    this.http.get<string>(this.youtubeVideo + '?idVideo=' + idVideo).subscribe({
      next: (res) => {
        console.log('Youtube: ', res);
      },
      error: (error) => {
        console.error('Erreur youtube !', error);
      }
    });
  }

  public getTvChannel(chaineTv: string): void {
    let channelRequested = this.tvUrl;
    channelRequested = channelRequested.concat('?chaine=' + chaineTv);

    this.http.get<boolean>(channelRequested).subscribe({
      next: () => console.log('Chaine mise : ' + chaineTv),
      error: () => console.error('erreur chaine tv')
    });
  }

  public openNetflixTab(): Observable<boolean> {
    return this.http.get<boolean>(this.netflixTab);
  }

  public getCurrentMedia(): Observable<string> {
    return this.http.get(this.currentMedia, { responseType: 'text' });
  }

  public getSwitchPause(): Observable<boolean> {
    return this.http.get<boolean>(this.switchPause);
  }

  public postFullScreen(): Observable<unknown> {
    return this.http.post(this.fullScreen, [{ fullscreen: 'on' }]);
  }

  public getCloseTab(): Observable<boolean> {
    return this.http.get<boolean>(this.closeTab);
  }

  public getSwitchMonitor(): Observable<boolean> {
    return this.http.get<boolean>(this.switchMonitor);
  }

  public sendLeftClick(xPosition: number, yPosition: number): Observable<unknown> {
    const params = { xPosition, yPosition };
    return this.http.post(this.leftClick, params);
  }

  public typeKeyboardKey(key: string): Observable<string> {
    return this.http.post<string>(this.pressKeyboardKey, key);
  }

  public sendVocalCommand(cmd: string): Observable<boolean> {
    return this.http.post<boolean>(this.vocalCommandUrl, cmd);
  }
}
