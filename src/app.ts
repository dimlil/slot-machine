import express from 'express';
import Slot from './controller/slot.js';

const app = express();

const slot = new Slot();

slot.spin();


app.listen(() => {
    console.log(`Server running on port ${3000}`);
});