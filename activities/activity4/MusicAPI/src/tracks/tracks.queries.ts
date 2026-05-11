export const trackQueries = {
    createTrack:
        `insert into tracks (album_id, title, number, video_url) VALUES(?,?,?,?)`,
    readTracks:
        `select title as title, video_url as video, lyrics as lyrics from music.tracks where album_id = ?`,
    updateTrack:
        `update music.tracks set title =?, number = ?, video_url = ?, lyrics = ? where id = ?;`
}
