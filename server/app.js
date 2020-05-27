const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

//connect to DB
mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('connected to DB')
});

app.use(express.json());
app.use(cors());


//Routes
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/post'));

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});