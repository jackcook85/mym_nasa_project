const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs')

var mongoose = require('mongoose');
var User = require('../models/userModel');

mongoose.connect("mongodb+srv://jack-user:xG1uUiB768v6g9ns@cluster47197.dvgwacl.mongodb.net/nasa-account-logs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default async function register(req, res) {
    const { username, password: plaintextpassword } = req.body
    try {
        //Check username
        if (!username || typeof username != 'string') {
            res.json({ error: 'Invalid username' });
        }

        //Check password
        if (!plaintextpassword || typeof plaintextpassword != 'string') {
            res.json({ error: 'Invalid Password' });
        }

        //Hash the password
        const password = await bcrypt.hash(plaintextpassword, 10)

        //Create the new user
        const response = await User.create({ "username": username, "password": password });
        res.json({status: "Success"});
        console.log("User Created Successfully", response)
    } catch (err) {
        console.error(err);
        return res.json({ error: 'Server error' });
    }
}