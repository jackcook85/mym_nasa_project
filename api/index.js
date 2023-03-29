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

app.post('/register', async (req, res) => {
    const { username, password: plaintextpassword } = req.body
    try {
        //Check username
        if (!username || typeof username != 'string') {
            return res.json({ error: 'Invalid username' });
        }

        //Check password
        if (!plaintextpassword || typeof plaintextpassword != 'string') {
            return res.json({ error: 'Invalid Password' });
        }

        //Hash the password
        const password = await bcrypt.hash(plaintextpassword, 10)

        //Create the new user
        const response = await User.create({ "username": username, "password": password });
        return res.json({status: "Success"});
    } catch (err) {
        console.error(err);
        return res.json({ error: 'Server error' });
    }
})

app.post('/login', async (req, res) => {
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
})

app.post('/remove', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ "username": username }).lean();
    try {
        if (!user) {
            return res.json({ error: "Not an existing user" })
        }
        //Check username
        if (!username || typeof username != 'string') {
            return res.json({ error: 'Invalid username' })
        }
        //Check password
        if (!password || typeof password != 'string') {
            return res.json({ error: 'Invalid Password' })
        }
        //Check Credentials
        if (await bcrypt.compare(password, user.password)) {
            //Delete the user if password is correct
            const response = await User.deleteOne(user);
            return res.json({ status: "Success" })
        }
        else {
            return res.json({ error: "Incorrect Password for This Account" })
        }
    } catch (err) {
        console.error(err)
        return res.json({ error: "System Error" });
    }
})

app.use('/', express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);

module.exports = app