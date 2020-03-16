const express = require('express');
const app = express();

const http = require('http').Server(app);
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Listening port " + 3000);
});