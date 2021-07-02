
const express = require('express');
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express();

mongoose.connect('mongodb+srv://pauluci:31m052001@app.mil7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)
app.listen(3000)

console.log("servidor rodando na porta 3000")