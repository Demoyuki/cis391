import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicServiceService } from '../service/music-service.service';
import { Album, createAlbum } from '../models/albums.model';
import { Track, createTrack } from '../models/tracks.model';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-album.html',
  styleUrl: './create-album.css'
})
export class CreateAlbumComponent implements OnInit {

  // enables edit mode when passed in from edit-album
  @Input() album: Album | null = null;

  newAlbum: Album = createAlbum();
  newTrack: Track = createTrack();
  statusMessage: string = '';
  isEditMode: boolean = false;

  constructor(private service: MusicServiceService, private router: Router) {}

  ngOnInit(): void {
    if (this.album) {
      // EDIT MODE — copy album so we don't mutate the original
      this.isEditMode = true;
      this.newAlbum = { ...this.album, tracks: [...this.album.tracks] };
    } else {
      // CREATE MODE
      this.newAlbum = createAlbum();
      this.newAlbum.tracks = [];
    }
  }

  addTrack() {
    const track: Track = createTrack();
    track.title = this.newTrack.title;
    track.number = this.newAlbum.tracks.length + 1;
    track.video = this.newTrack.video;
    track.lyrics = this.newTrack.lyrics;
    this.newAlbum.tracks.push(track);
    this.newTrack = createTrack();
  }

  onSubmit() {
    if (this.isEditMode) {
      this.service.updateAlbum(this.newAlbum, () => {
        this.statusMessage = 'Album updated successfully!';
        this.router.navigate(['list-artists'], { queryParams: { data: new Date() } });
      });
    } else {
      this.service.createAlbum(this.newAlbum, () => {
        this.statusMessage = 'Album created successfully!';
        this.router.navigate(['list-artists'], { queryParams: { data: new Date() } });
      });
    }
  }

  onReset() {
    if (this.isEditMode && this.album) {
      this.newAlbum = { ...this.album, tracks: [...this.album.tracks] };
    } else {
      this.newAlbum = createAlbum();
      this.newAlbum.tracks = [];
    }
    this.newTrack = createTrack();
    this.statusMessage = '';
  }
}
