import express from 'express';
import { addPost, getPosts, getPostById } from '../controllers/blogControllers.js';

const blogRouter = express.Router();

blogRouter.get('/', getPosts);
blogRouter.get('/post/:id', getPostById);
blogRouter.get('/add-post', (req, res) => {
    res.render('addPost');
});
blogRouter.post('/add-post', addPost);

export default blogRouter;