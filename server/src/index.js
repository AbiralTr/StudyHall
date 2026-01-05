import Express from 'express';
import { engine } from "express-handlebars";
import path from "path";
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = Express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// View Engine
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "views"));

// Middleware
app.use(Express.json());
app.use(Express.static("public"));
app.use(Express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the StudyHall API, use /home or /login to access the web app.');
})
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});

// Server Start
app.listen(PORT, () => {
    console.log(`Studyhall is Listening on http://localhost:${PORT}`);
});