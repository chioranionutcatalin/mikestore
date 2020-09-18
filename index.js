const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));


// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use('/api', require('./router/sheet'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});