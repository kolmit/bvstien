import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {


  apiKey: string = 'AIzaSyBtaqc0h6_WudXp1CZvro0555yepBO1_7o';

  constructor(public http: HttpClient) { }

  getVideosForChanel(channel, maxResults): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet&type=video,id&maxResults=4';
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  searchVideo(stringSearched: string) {
    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' + stringSearched + ' &type=video&key=' + this.apiKey;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
}
