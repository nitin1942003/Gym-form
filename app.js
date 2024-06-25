const express = require("express");
const path =require("path");
const fs = require("fs");
const { title } = require("process");

const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views')) //set the views directory

//END POINTS
app.get("/", (req,res)=>{
    const con="This is the best way to do the work in efficient way"
    const params ={'title':'PubG is the best game', 'content': con, 'submitted': false}
    res.status(200).render('demo.pug',params)
});

app.post("/",(req,res)=>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    console.log(req.body)
    let outputToWrite = `\nName of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
    fs.appendFileSync('output.txt', outputToWrite)
    const params ={'title':'PubG is the best game', 'message': 'Submitted', 'submitted': true }
    res.status(200).render('demo.pug',params);
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started sucessfully on port ${port}`)
})