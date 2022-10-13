const express = require('express');
const app = express()
const path = require('path');
const dbConnect = require('./dbConnect');
const port = 8080;
const User = require('./models/user');
dbConnect();

app.use(express.json())
app.get("/ping", (req, res) => {
    let msg = "pong!"
    console.log(msg)
    res.json({ msg })
})
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.html"))    
// })

app.post("/addid", (req, res) => {
    console.log(req.body)
    fetch(`https://api.github.com/users/${req.body.userid}`).then(res => res.json()).then(async (data) => {
        console.log(data);
        const data = await User.find({ "login": req.body.userid })
        if (data.length) {
            res.send({ msg: "user already exist", data })
        }
        else {
        try {
            const docs = await User.create(data)
            let userData = Promise.resolve(docs)
            console.log(Promise.resolve(docs))
            res.send({ msg: "user already exist", data: userData })
        } catch (error) {
            return Promise.reject(error)
        }
        }

    })
    res.send({ msg: "api working" })
})
// first api to rescive a user ID and save it to the DB

app.listen(port, (err) => {
    if (!err) {
        console.log(`server started and app listning on ${port}`)
    } else {
        console.log(`error launching server ${err}`)
    }
})