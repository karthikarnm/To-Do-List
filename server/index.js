
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const cors = require('cors');

const routing = require('./Routes/ToDoRoutes,.js');

const PORT = 4000;
const URL = "mongodb+srv://karanamkarthi5:kk@cluster0.gxpfz7s.mongodb.net/To-Do-List"

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));



app.use('/', routing);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});