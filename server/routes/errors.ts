import express, { Response } from 'express';
import _ from "lodash";

const router = express.Router();

router.get('/404', (_, res: Response) => {
    return res.render('errors/404'); 
});

router.get('/500', (_, res: Response) => {
    return res.render('errors/500');
})

export default router;