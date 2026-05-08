export const albumQueries = {
	readAlbums:
		`select id as albumId, title as title, artist as artist, description as description, year as year, image as image from music.albums`,
	readAlbumsByArtist:
		`select id as albumId, title as title, artist as artist, description as description, year as year, image as image from music.albums
	   where music.albums.artist = ?`,
	readAlbumsByArtistSearch:
		`select id as albumId, title as title, artist as artist, description as description, year as year, image as image from music.albums
	   where music.albums.artist like ?`,
	readAlbumsByDescriptionSearch:
		`select id as albumId, title as title, artist as artist, description as description, year as year, image as image from music.albums
	   where music.albums.description like ?`,
	readAlbumsByAlbumId:
		`select id as albumId, title as title, artist as artist, description as description, year as year, image as image from music.albums
	   where music.albums.id = ?`,
	createAlbum:
		`insert into albums(title, artist, description, year, image) values(?,?,?,?,?)`,
	updateAlbum:
		`update music.albums set title=?, artist=?, year=?, image=?, description=? where id = ?`,
	deleteAlbum:
		`delete from music.albums where id = ?`,
}
