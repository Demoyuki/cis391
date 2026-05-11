import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  title = 'My Music Collection';
  version = 1.0;

  constructor(private router: Router) {}

  displayVersion() {
    alert('Version: ' + this.version);
  }

  displayArtistList() {
    this.router.navigate(['list-artists'], { queryParams: { data: new Date() } });
  }
}