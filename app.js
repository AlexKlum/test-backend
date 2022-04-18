const cors = require("cors")
const express = require("express")
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3001

app.use('/healthcheck', require('./routes/healthcheck.js'));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());

app.get("/", (request ,response)=>{
    headers={"http_status":200, "cache-control": "no-cache"}
    body={"status": "available"}
    response.set('Content-Type', 'application/json');
    response.status(200).send(body)
})

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

app.listen(PORT , ()=>{
    console.log(`STARTED LISTENING ON PORT ${PORT}`)
})