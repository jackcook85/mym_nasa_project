const http = require('http');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var mongoose = require('mongoose');
var User = require('../models/userModel');

const app = express();


app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static("express"));
app.use(bodyparser.json())

const jwt_secret = 'kkaabjs;odfj-fgpyiuhjqwekoplDFawbefbeknscaS;DFH[0P.jegfh20uoiuweHs'

mongoose.connect("mongodb+srv://jack-user:xG1uUiB768v6g9ns@cluster47197.dvgwacl.mongodb.net/nasa-account-logs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/', express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);