import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';
import { ListAlbumsComponent } from '../list-albums/list-albums';

@Component({
  selector: 'app-list-artists',
  standalone: true,
  imports: [CommonModule, ListAlbumsComponent],
  templateUrl: './list-artists.html',
  styleUrl: './list-artists.css'
})
export class ListArtistsComponent implements OnInit {

  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}

  ngOnInit(): void {
    // Load artists once on init — do NOT reset selectedArtist inside queryParams
    // because that caused the double-click issue
    this.service.getArtists((artists: Artist[]) => {
      this.artists = artists;
      console.log('this.artists', this.artists);
    });
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}