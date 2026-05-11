import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {

  private host = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all artists from the API.
   */
  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + '/artists')
      .subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  /**
   * Fetches all albums from the API.
   */
  public getAlbums(callback: (albums: Album[]) => void): void {
    this.http.get<Album[]>(this.host + '/albums')
      .subscribe((albums: Album[]) => {
        callback(albums);
      });
  }

  /**
   * Fetches all albums for a specific artist.
   * encodeURIComponent handles artist names with spaces e.g. "The Beatles"
   */
  public getAlbumsOfArtist(artistName: string, callback: (albums: Album[]) => void): void {
    const request = this.host + '/albums/' + encodeURIComponent(artistName);
    console.log('request', request);
    this.http.get<Album[]>(request)
      .subscribe((albums: Album[]) => {
        console.log('have albums', albums);
        callback(albums);
      });
  }

  /**
   * Fetches a single album by albumId using the ?albumId= query param.
   * The API returns an array so we take index [0].
   */
  public getAlbum(albumId: number, callback: (album: Album) => void): void {
    this.http.get<Album[]>(this.host + '/albums?albumId=' + albumId)
      .subscribe((albums: Album[]) => {
        if (albums && albums.length > 0) {
          callback(albums[0]);
        }
      });
  }

  /**
   * Posts a new album to the API.
   */
  public createAlbum(album: Album, callback: () => void): void {
    this.http.post<Album>(this.host + '/albums', album)
      .subscribe(() => {
        callback();
      });
  }

  /**
   * Puts an updated album to the API.
   */
  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put<Album>(this.host + '/albums', album)
      .subscribe(() => {
        callback();
      });
  }

  /**
   * Deletes an album from the API by ID.
   */
  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + '/albums/' + id)
      .subscribe(() => {
        callback();
      });
  }
}