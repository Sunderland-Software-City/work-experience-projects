import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import nunjucks from 'nunjucks';
import api from './routes/api.mjs';
import web from './routes/web.mjs';

const app = express();
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'njk');

app.use('/api', api); // for services
app.use('/', web); // for students

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: true,
});

const APP_PORT = process.env.APP_PORT ?? 3000;

app.listen(APP_PORT, () => {
	console.log(`Server running on http://localhost:${APP_PORT}`);
});
