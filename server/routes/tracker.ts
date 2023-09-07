import express, {Request, Response} from 'express';
import { checkAuthenticated } from './middleware';

import Log from "../schema/log";

const router = express.Router();

router.get('/', checkAuthenticated, async (req: Request, res: Response) => {
    const logs = await Log.find({ username: req.user!.username })
        .then(logs => logs.map(log => log.toObject()));
    return res.render('logGraph', { logs })
});

router.get('/log', checkAuthenticated, (req: Request, res: Response) => {
    return res.render('logForm');
});

router.post('/log', checkAuthenticated, (req: Request, res: Response) => {
    console.log(req.body)
    return res.redirect('/tracker/log');
});

export default router;