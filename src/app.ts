import express from 'express';
import Slot from './controller/slot.js';

const app = express();

const slot = new Slot();

app.listen(() => {
    console.log(`Server running on port ${3000}`);
});