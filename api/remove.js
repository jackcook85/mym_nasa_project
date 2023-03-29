const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs')

var mongoose = require('mongoose');
var User = require('../models/userModel');

mongoose.connect("mongodb+srv://jack-user:xG1uUiB768v6g9ns@cluster47197.dvgwacl.mongodb.net/nasa-account-logs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default async function remove(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({ "username": username }).lean();
    try {
        if (!user) {
            res.json({ error: "Not an existing user" })
        }
        //Check username
        if (!username || typeof username != 'string') {
            res.json({ error: 'Invalid username' })
        }
        //Check password
        if (!password || typeof password != 'string') {
            res.json({ error: 'Invalid Password' })
        }
        //Check Credentials
        if (await bcrypt.compare(password, user.password)) {
            //Delete the user if password is correct
            const response = await User.deleteOne(user);
            res.json({ status: "Success" })
        }
        else {
            res.json({ error: "Incorrect Password for This Account" })
        }
    } catch (err) {
        console.error(err)
        res.json({ error: "System Error" });
    }
}