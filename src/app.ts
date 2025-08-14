import express from 'express';
import { router } from './routes/routes.js';

const app = express();
// Routes
app.use('/api/slot', router);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});