import { Request, Response, Router } from 'express';
import Slot from '../controller/slot.js';
import config from '../config/config.js';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
    const slot = new Slot(config);
    const result = slot.spin();
    console.log(result);
    res.json(result);
});
router.get('/simulation/:totalSpins', (req: Request, res: Response) => {
    const { totalSpins } = req.params;
    const result: object[] = [];
    for (let i = 0; i < Number(totalSpins); i++) {
        const slot = new Slot(config);
        result.push(slot.spin());
        console.log(result);
    }
    res.json(result);
});