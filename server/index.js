require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {SERVER_PORT} = process.env;
const {sequelize} = require('./util/database');
const {User} = require('./models/user');
const {Post} = require('./models/post');
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts');
const {register, login} = require('./controllers/auth');
const {isAuthenticated} = require('./middleware/isAuthenticated');

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);


app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);

app.get('/userposts/:userId', isAuthenticated, getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`server on ${SERVER_PORT}`));
})
.catch((error) => console.log(error));