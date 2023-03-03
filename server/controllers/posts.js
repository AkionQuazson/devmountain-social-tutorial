const {User} = require('../models/user')
const {Post} = require('../models/post')

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {privateStatus: false},
            include: [{
                model: User,
                required: true,
                attributes: ['username']
            }]
        })
        res.status(200).send(posts);
    } catch (error) {
        console.log('error in getAllPosts', error);
        res.sendStatus(400);
    }
}
const getCurrentUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.findAll({
            where: {userId: userId},
            include: [{
                model: User,
                required: true,
                attributes: ['username']
            }]
        })
        res.status(200).send(posts);
    } catch (error) {
        console.log('error in getCurrentUserPosts', error);
        res.sendStatus(400);
    }
}
const addPost = async (req, res) => {
    try {
        const {title, content, status, userId} = req.body;
        await Post.create({title, content, privateStatus:status, userId})
        res.sendStatus(200);
    } catch(error) {
        console.log('ERROR IN addPost', error);
        res.sendStatus(400);
    }
}
const editPost = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        await Post.update({privateStatus: status}, {
            where: {id: +id}
        })
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN editPost', error);
        res.sendStatus(400);
    }
}
const deletePost = async (req, res) => {

}
module.exports = {
    getAllPosts,
    getCurrentUserPosts,
    addPost,
    editPost,
    deletePost
}