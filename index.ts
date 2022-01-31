//imports
const express:any = require('express');
// import config from 'config';
import helmet = require('helmet');
import cors = require('cors')
require('dotenv').config()

import db from './config/db';

const path = require('path');
import user from './api/user';
import auth from './api/auth';
import post from './api/post';
import donations from './api/donations';
//constants
const app: any = express();
const PORT = process.env.PORT || process.env.port;
//Handling routes
app.use(express.json({ extended: false, limit:'50000kb' }));
//starting up the server on the port specified
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/donations', donations);
//setting up security features
// app.use(helmet());
// app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
//setting up express and mongoDB
app.get('*', (req, res) =>{
    return res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
db();
