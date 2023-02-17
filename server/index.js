require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {PORT} = process.env;

import {login, register} from './controllers/auth';
import {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} from './controllers/posts';
import { isAuthenticated } from './middleware/isAuthenticated';

const app = express();
app.use(express.json())
app.use(cors())

app.post('/register', register);
app.post('/login', login);

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})