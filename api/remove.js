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

export default async function remove(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({ "username": username }).lean();
    try {
        if (!user) {
            alert(res.json({ error: "Not an existing user" }))
        }
        //Check username
        if (!username || typeof username != 'string') {
            alert(res.json({ error: 'Invalid username' }))
        }
        //Check password
        if (!password || typeof password != 'string') {
            alert(res.json({ error: 'Invalid Password' }))
        }
        //Check Credentials
        if (await bcrypt.compare(password, user.password)) {
            //Delete the user if password is correct
            const response = await User.deleteOne(user);
            alert(res.json({ status: "Success" }))
        }
        else {
            alert(res.json({ error: "Incorrect Password for This Account" }))
        }
    } catch (err) {
        console.error(err)
        alert(res.json({ error: "System Error" }));
    }
}