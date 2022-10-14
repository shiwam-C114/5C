require("dotenv").config();
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


// first api to rescive a user ID and save it to the DB
app.post("/addid", (req, res) => {
    console.log(req.body)
    fetch(`https://api.github.com/users/${req.body.userid}`).then(res => res.json()).then(async (data) => {
        console.log(data);
        const userdata = await User.find({ "login": req.body.userid })
        if (userdata.length) {
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

// api for finding mutual friend
app.post("/findmutual", async (req, res) => {
    let data = await fetch(`https://api.github.com/users/${req.body.userid}/followers`)
    let followers = await data.json()
    let data2 = await fetch(`https://api.github.com/users/${req.body.userid}/following`)
    let following = await data2.json()
    const results = followers.filter(({ id: id1 }) => following.some(({ id: id2 }) => id2 === id1));
    console.log(results)
    res.send({ msg: `mutual friends found: ${results.length}`, data: results })
})

//api for searching
app.get("/searchuser", async (req, res) => {

    const { username, location } = req.query;
    const data = await User.find({ "login": username, "location": location })

    res.send({ msg: "user found ", data })
})

//api for deleting user
app.delete("/deleteuser/:username", async (req, res) => {
    const username = req.params.username
    const data = await User.find({ "login": username })
    console.log(data);
    if (data.length) {
        const info = await User.deleteOne({ "login": username })
        res.send({ msg: "success", data: info })

    }
    else {
        res.send({ msg: "user not found" })
    }
})

// update user api 
app.patch("/updateuser/:username", async (req, res) => {
    const username = req.params.username
    const data = await User.find({ "login": username })
    const newData = req.body;
    if (data.length) {
        const info = await User.updateMany({ "login": username }, { $set: newData })
        res.send({ msg: "success", data: info })
    }
    else {
        res.send({ msg:"user not found"})
    }

})
// api for getting sorted data
app.get("/sorted", async (req, res) => {

    const { public_repos, public_gists, followers, following, created_at } = req.query;
    const data = await User.find().sort({
        "public_repos": public_repos,
        "public_gists": public_gists,
        "followers": followers,
        "following": following,
        "created_at": created_at
    })
    if (data.length) {
        res.send({ msg: "sorted data", data })
    }
    else {
        res.send({ msg: "user not found"})
    }

})


app.listen(port, (err) => {
    if (!err) {
        console.log(`server started and app listning on ${port}`)
    } else {
        console.log(`error launching server ${err}`)
    }
})