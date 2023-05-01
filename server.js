const express = require('express');
const appRoute = require('./routes/route.js');
const app = express();
app.use(express.json())
app.use('/api',appRoute)

app.listen(3000,()=>{
    console.log("Server started");
})