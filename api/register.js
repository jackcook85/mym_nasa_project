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

export default async function register(req, res) {
    const { username, password: plaintextpassword } = req.body
    try {
        //Check username
        if (!username || typeof username != 'string') {
            alert(res.json({ error: 'Invalid username' }));
        }

        //Check password
        if (!plaintextpassword || typeof plaintextpassword != 'string') {
            alert(res.json({ error: 'Invalid Password' }));
        }

        //Hash the password
        const password = await bcrypt.hash(plaintextpassword, 10)

        //Create the new user
        const response = await User.create({ "username": username, "password": password });
        alert(res.json({status: "Success"}));
        console.log("User Created Successfully", response)
    } catch (err) {
        console.error(err);
        return res.json({ error: 'Server error' });
    }
}