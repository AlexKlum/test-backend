// === ALLA PROGRAM SOM BEHÖVS VARA MED FÖR ATT SIDAN SKA KUNNA KÖRAS ===
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand')
var env = dotenv.config()

dotenvExpand.expand(env)

const CONNECTION_STRING = process.env.CONNECTION_STRING
const PORT = process.env.PORT || 3001

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Thread = require("./model/threads");
const Reply = require("./model/replies");
const Like = require("./model/likes");
const User = require("./model/users");
const { response } = require("express");

const app = express()

app.use('/healthcheck', require('./routes/healthcheck.js'));
app.use('/threads', require('./routes/threads.js'));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());


// === FÖRSTA SIDAN ===

app.get("/", (request ,response)=>{
    response.set("http_status",200)
    response.set("cache-control", "no-cache")
    response.set('Content-Type', 'application/json');
    body={"status": "available"}
    response.status(200).send(body)

    User.create
})

// === THREADS ===

app.get("/threads", (request, response) => {
    body={"threads":
    [
        {"id":"1"}
        ,{"id":"2"}
        ,{"id":"3"}
        ,{"id":"4"}
    ]}
    response.status(200).send(body)
})

app.post("/threads", (request, response) => {
    console.log(request.body)
    body={"threads":
    [
        {"id":"1"}
        ,{"id":"2"}
        ,{"id":"3"}
        ,{"id":"4"}
    ]}
    response.status(200).send(body)
})

app.get("/threads/:id", (request, response)=> {
    console.log(request.params)
    body={"id":request.params.id}
    response.status(200).send(body)
})

app.get("/threads/:id/replies", (request, response)=> {
    console.log(request.params)
    body={"id":request.params.id, "replies": [{"id":1, "reply": "any reply"}, {"id":2, "reply": "any reply"}]}
    response.status(200).send(body)
})

app.post("/threads/:id/replies", (request, response)=> {
    console.log(request.params)
    console.log(request.body)
    body={"id":request.params.id, "replies": [{"id":1, "reply": "any reply"}, {"id":2, "reply": "any reply"}]}
    response.status(200).send(body)
})

app.post("/threads/:threadId/replies/:replyId/like", (request, response)=> {
    console.log(request.params)
    body={"threadId":request.params.threadId, "replyId": request.params.replyId}
})

app.delete("/threads/:threadId/replies/:replyId/like", (request, response)=> {
    console.log(request.params)
    body={"threadId":request.params.threadId, "replyId": request.params.replyId}
})

// curl -X POST http://localhost:3001/users -H 'Content-Type: application/json' -d '{\"username\":\"nisse\",\"password\":\"password\"}'
// Skapa User
app.post("/users", (request, response) => {
    console.log(request.body)
    let user = new User(request.body)
    user.save()
    response.status(200).json(request.body)
})

// curl -X GET http://localhost:3001/users/625ed4fc79736a24c5e199d9 -H 'Content-Type: application/json'
// Hämta User
app.get("/users/:id", (request, response)=>{
    console.log(request.params.id)
    try{
    User.findById(request.params.id, (err, user)=>{
        console.log(user)
        if (err) throw error;
        if (user) {
            response.status(200).json(user)
        } else {
            response.status(404).send("Not found")
        }
    })
}catch(e){
    response.status(404).send("Bad request")
}
})

app.delete("users/:id", (request, response)=>{
    try{
        User.deleteOne({ _id: request.params.id});
        response.status(200).send("Success")
    } catch(e){
        response.status(400).send("Bad request")
    }
})

app.listen(PORT , ()=>{
    console.log(`STARTED LISTENING ON PORT ${PORT}`)
})