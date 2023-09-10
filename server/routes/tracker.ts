import express, {Request, Response} from 'express';
import { checkAuthenticated } from './middleware';

import Log from "../schema/log";
import User from "../schema/user";
import _ from 'lodash';

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
    const today = new Date()
    const userLog = new Log({ username: req.user!.username, gamingDurationMs : req.body.gaminghours, createdAt: today})
    userLog.save()
    return res.redirect('/tracker/log');
});

router.get('/setlimit', checkAuthenticated, async (req: Request, res: Response) => {
    return res.render('setLimit');
});

router.post('/setlimit', checkAuthenticated, async (req: Request, res: Response) => {
    console.log(req.body.gamingHourLimit)
    const filter = { username : req.user!.username }
    const update = { gaming_duration_limit_ms : req.body.gamingHourLimit }
    const currentUser = await  User.findOneAndUpdate(filter, update)

    if (_.isNull(currentUser)) {
        return res.redirect('/users/logout');
    }

    currentUser.save()
    return res.render('setLimit');
});

router.get('/dailyreward', checkAuthenticated, async (req: Request, res: Response) => {
    return res.render('dailyReward')
})

router.post('/dailyreward', checkAuthenticated, async (req: Request, res: Response) => {
    const filter = { username : req.user!.username }
    const currentUser = await  User.findOne(filter)

    if (_.isNull(currentUser)) {
        return res.redirect('/users/logout');
    }

    if (currentUser.claimed_coins_today == 'yes') {
        return res.redirect('nocoins')
    } else {
        currentUser.coins = currentUser.coins + 10
        currentUser.claimed_coins_today = 'yes'
        currentUser.save()
        return res.redirect('dailyreward')
    }
})

router.get('/nocoins', checkAuthenticated, async (req: Request, res: Response) => {
    res.render('noCoins')
})

export default router;