import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { DisplayAlbumComponent } from '../display-album/display-album';

@Component({
  selector: 'app-list-albums',
  standalone: true,
  imports: [CommonModule, DisplayAlbumComponent],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css'
})
export class ListAlbumsComponent implements OnInit {

  @Input() artist!: Artist;

  albums: Album[] = [];
  selectedAlbum: Album | null = null;

  constructor(private service: MusicServiceService) {}

  ngOnInit(): void {
    if (this.artist?.artist) {
      this.service.getAlbumsOfArtist(this.artist.artist,
        (albums: Album[]) => {
          this.albums = albums;
          console.log('albums loaded', this.albums);
        });
    }
  }

  public onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}