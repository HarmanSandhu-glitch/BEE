import express from 'express';
import blogRouter from './routes/blogRoutes.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
    req.requestTime = new Date().toISOString();
    console.log(req.method, req.path, req.requestTime);
    next();
}

app.use('/', logger, blogRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});