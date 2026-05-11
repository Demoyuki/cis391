import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-delete-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-album.html',
  styleUrl: './delete-album.css'
})
export class DeleteAlbumComponent implements OnInit {

  artist: string = '';
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MusicServiceService
  ) {}

  ngOnInit(): void {
    this.artist = this.route.snapshot.paramMap.get('artist')!;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  delete() {
    this.service.deleteAlbum(this.id, () => {
      this.router.navigate(['list-artists'], { queryParams: { data: new Date() } });
    });
  }

  cancel() {
    this.router.navigate(['list-artists']);
  }
}
