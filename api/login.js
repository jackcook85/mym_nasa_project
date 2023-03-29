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
export default async function login(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({ "username": username }).lean();
    if (!user) {
        return res.json({ status: 'error', error: "Invalid username/password" })
    }
    const true_pass = user.password
    if (await bcrypt.compare(password, true_pass)) {
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, jwt_secret)

        return res.json({ status: 'ok', data: token });
    }
    return res.json({ status: 'error', error: "Invalid username/password" });
}