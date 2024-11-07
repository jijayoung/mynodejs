const postService = require('../services/postService');

const createPost = async (req, res) => {
    try {
        const {title,content} = req.body;
        const user = req.user;
        const post = await postService.createPost({
            title:title,
            content:content,
            UserId : user.id
        });

        res.status(200).json({ data: post, message: 'ok' })
    } catch (e) {
        res.status(500).json({ message: e, data: e.message })
    }
}

const findAll = async (req, res) => {
    try {
        const post = await postService.findAll();
        res.status(200).json({ data: post, message: 'ok' })
    } catch (e) {
        res.status(500).json({ message: e, data: e.message })
    }
}

const findPostById = async (req, res) => {
    try {
        const post = await postService.findPostById(req.params.id);
        res.status(200).json({ data: post, message: 'ok' })
    } catch (e) {
        res.status(500).json({ message: e })
    }
}


const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postService.updatePost(id, req.body);
        res.status(200).json({ data: post, message: 'ok' })
    } catch (e) {
        res.status(500).json({ message: e, data: e.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postService.deletePost(id, req.body);
        res.status(200).json({  message: 'ok' })
    } catch (e) {
        res.status(500).json({ message: e, data: e.message })
    }
}

module.exports = {
    createPost,
    findPostById,
    findAll,
    updatePost,
    deletePost,
}