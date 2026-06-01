import { Request, RequestHandler, Response } from 'express';
import { Album } from './albums.model';
import { Track } from '../tracks/tracks.model';
import * as AlbumDao from './albums.dao';
import * as TracksDao from '../tracks/tracks.dao';
import { OkPacket } from 'mysql2';

export const readAlbums: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albums;
        let albumId = parseInt(req.query.albumId as string);

        console.log('albumId', albumId);
        if (Number.isNaN(albumId)) {
            albums = await AlbumDao.readAlbums();
        } else {
            albums = await AlbumDao.readAlbumsByAlbumId(albumId);
        }
        await readTracks(albums, res);
        res.status(200).json(
            albums
        );
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByArtist: RequestHandler = async (req: Request, res: Response) => {
    try {
        const albums = await AlbumDao.readAlbumsByArtist(req.params.artist);
        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByArtistSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const albums = await AlbumDao.readAlbumsByArtistSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const albums = await AlbumDao.readAlbumsByDescriptionSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const createAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.createAlbum(req.body);

        console.log('req.body', req.body);
        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try {
                await TracksDao.createTrack(track, index, okPacket.insertId);
            } catch (error) {
                console.error('[albums.controller][createAlbumTracks][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when writing album tracks'
                });
            }
        });

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[albums.controller][createAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing albums'
        });
    }
};

export const updateAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.updateAlbum(req.body);

        console.log('req.body', req.body);
        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try {
                await TracksDao.updateTrack(track);
            } catch (error) {
                console.error('[albums.controller][updateAlbum][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when updating album tracks'
                });
            }
        });

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[albums.controller][updateAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing albums'
        });
    }
};

export const deleteAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albumId = parseInt(req.params.albumId as string);
        console.log('albumId', albumId);

        if (!Number.isNaN(albumId)) {
            const response = await AlbumDao.deleteAlbum(albumId);
            res.status(200).json(response);

        } else {
            throw new Error("Integer expected for albumId");
        }

    } catch (error) {
        console.error('[albums.controller][deleteAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting albums'
        });
    }
};

async function readTracks(albums: Album[], res: Response<any, Record<string, any>>) {

    for (let i = 0; i < albums.length; i++) {

        try {
            const tracks = await TracksDao.readTracks(albums[i].albumId);
            albums[i].tracks = tracks;

        } catch (error) {
            console.error('[albums.controller][readTracks][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching albums tracks'
            });
        }
    }

};



