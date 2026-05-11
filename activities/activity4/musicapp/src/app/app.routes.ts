import { Routes } from '@angular/router';
import { CreateAlbumComponent } from './create-album/create-album';
import { ListArtistsComponent } from './list-artists/list-artists';
import { ListAlbumsComponent } from './list-albums/list-albums';
import { DisplayAlbumComponent } from './display-album/display-album';
import { EditAlbumComponent } from './edit-album/edit-album';
import { DeleteAlbumComponent } from './delete-album/delete-album';

export const routes: Routes = [
  { path: 'create', component: CreateAlbumComponent },
  { path: 'list-artists', component: ListArtistsComponent },
  { path: 'list-albums', component: ListAlbumsComponent },
  { path: 'display/:id', component: DisplayAlbumComponent },
  { path: 'edit/:artist/:id', component: EditAlbumComponent },
  { path: 'delete/:artist/:id', component: DeleteAlbumComponent }
];