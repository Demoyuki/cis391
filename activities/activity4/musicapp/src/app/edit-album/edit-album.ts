import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MusicServiceService } from '../service/music-service.service';
import { Album } from '../models/albums.model';
import { CreateAlbumComponent } from '../create-album/create-album';

@Component({
  selector: 'app-edit-album',
  standalone: true,
  imports: [CommonModule, CreateAlbumComponent],
  templateUrl: './edit-album.html',
  styleUrl: './edit-album.css'
})
export class EditAlbumComponent implements OnInit {

  album: Album | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: MusicServiceService
  ) {}

  ngOnInit(): void {
    // Route is /edit/:artist/:id — read id param
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('edit albumId', id);
    this.service.getAlbum(id, (album: Album) => {
      this.album = album;
      console.log('editing album', this.album);
    });
  }
}