
import Post from '../models/post';
import User from '../models/user';
import mongoose = require('mongoose');
import auth from '../middleware/auth';
import { check, validationResult } from 'express-validator';
import express = require('express');
const router = express.Router();
router.get('/', [auth], async (req: any, res: any) => {
    const user = await User.findById(req.user);
    if (!user) {
        return res.status(400).json({ msg: 'user not found' });
    }
    try {
        const post = await Post.find({ user: user.id });
        if (post.length === 0) {

            // console.log('Not made a single post');

            return res.status(400).json({ msg: 'The User Has Not Made A Single Post' })
        }

        return res.json({ msg: post })

    }

    catch {
        return res.status(500).json({ msg: 'server Error' })
    }

})
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.json({ msg: post });
        if (!post) {
            return res.status(400).json({ erros: ['post not found'] });
        }
    }
    catch {
        return res.status(400).json({ erros: ['post not found'] });
    }

})
router.get('/user/:id', async (req, res) => {
    try {
        const post = await Post.find({ user: req.params.id })
        return res.json({ msg: post })
    }
    catch (e) {
        return res.status(500).send('he doesn\' have any posts')
    }
})
router.post('/infinite', [check('from', 'from is required')], async (req: any, res: any) => {
    const errors = validationResult(req);
    console.log(req.body.to + req.body.from);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const post = await Post.find().sort({ date: -1 }).skip(Number(req.body.from)).limit(8);
        return res.json({ msg: post })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send('server error')
    }
});
router.post('/', [auth, check('title', 'title is required').not().isEmpty(), check('paypal', 'paypal me link is required').not().isEmpty(), check('description', 'description is required').not().isEmpty(), check('images', 'image are required').not().isEmpty()], async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user);
        if (user.isVerified) {


            const { title, description, images, paypal } = req.body


            const post = new Post({
                title, description, images, user: req.user, paypal
            })
            await post.save();
            return res.status(200).json({ post })
        }
        else {
            return res.status(401).json({ msg: 'YOu are not verified' });
        }
    }
    catch {
        return res.status(500).json({ msg: 'server error' });
    }
})
router.delete('/:id', [auth], async (req: any, res: any) => {
    console.log('Attempted to delete')
    const errors = validationResult(req);
    if (!req.params.id) {
        return res.status(400).json({ msg: 'not found' })
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ errors: ['Post not found'] })
    }
    const user = await User.findById(req.user);
    if (post.user.toString() === user._id.toString()) {
        await post.delete();

        return res.json({ msg: 'the post has been deleted' });
    }
    return res.status(401).json({ error: 'You are not autorized to take that action' });

})
router.put('/', [auth, check('id', 'Can\'t find post').not().isEmpty(), check('title', 'title is required').not().isEmpty(), check('description', 'description is required').not().isEmpty(), check('image', 'image is required').not().isEmpty(), check('paypal', 'paypal me link is required').not().isEmpty()], async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, image, id, paypal } = req.body
        console.log(title, description, image);
        let post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ errors: ['post not found'] });
        }
        const user = await User.findById(req.user);
        if (post.user.toString() !== user._id.toString()) {
            return res.status(401).json({ errors: ['You are not authorized to take that action'] });
        }
        post.title = title,
            post.description = description;
        post.image = image;
        post.paypal = paypal;
        await post.save()
        return res.status(200).json({ post })
    }
    catch (e) {
        console.log(e);

        return res.status(500).json({ msg: 'server error' });
    }
});
router.get('/search/:text', async (req, res) => {

    try {

        const posts = await Post.find({
            $text: {
                $search: req.params.text
            }
        });
        console.log(posts);
        if (posts.length < 1) {
            return res.status(400).json({ msg: 'None of the posts match your query' });
        }

        return res.json({ msg: posts });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ msg: 'None of the posts match your query' });
    }
});

module.exports = router;
export default router;

