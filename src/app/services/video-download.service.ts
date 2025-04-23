import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoDownloadService {
  private readonly YOUTUBE_API_URL = 'https://youtube-quick-video-downloader.p.rapidapi.com/api/youtube/links';
  private readonly API_KEY = 'c00baba97amsh73164b1b7cff6b8p185840jsne3d99b7659ae';

  constructor(private http: HttpClient) {}

  downloadYoutubeVideo(youtubeUrl: string): Observable<any> {
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': this.API_KEY,
        'x-rapidapi-host': 'youtube-quick-video-downloader.p.rapidapi.com',
        'Content-Type': 'application/json',
        'X-Forwarded-For': '70.41.3.18'
      },
      body: JSON.stringify({
        url: youtubeUrl
      })
    };

    return from(
      fetch(this.YOUTUBE_API_URL, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('API Response:', data);
          return data;
        })
    ).pipe(
      catchError(error => {
        console.error('Error in video download:', error);
        throw error;
      })
    );
  }

  isValidYoutubeUrl(url: string): boolean {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return pattern.test(url);
  }
}