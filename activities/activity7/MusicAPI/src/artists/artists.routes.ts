import { Request, Response, Router } from 'express';
import * as ArtistsController from './artists.controllers';

const router = Router();
router
    .route('/artists')
    .get(ArtistsController.readArtists);

export default router;