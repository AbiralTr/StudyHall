import Express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = Express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(Express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the StudyHall API');
})

app.listen(PORT, () => {
    console.log(`Studyhall is Listening on http://localhost:${PORT}`);
});