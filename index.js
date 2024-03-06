const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require('method-override');


const Chat = require("./Models/chat.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));

app.use(methodOverride('_method'));

main().then((res) =>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// let chat1 = new Chat({
//     from: "Neha",
//     to: "Priya",
//     msge: "Send me your exam sheet",
//     created_at: new Date()
// });
// chat1.save().then((res) =>{
//     console.log(res);
// })

// Index route
app.get("/chats", async(req, res) =>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
})

// New route
app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
})
app.get("/", (req, res) =>{
    res.send("working");
})

// Create route
app.post("/chats", (req, res) =>{
    let {from, to, msge} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msge: msge,
        created_at: new Date()
    });
    newChat.save().then((res) => console.log("chats was saved"))
    .catch((err) =>{
        console.log(err);
    })
    res.redirect("/chats");
})

// Edit route
app.get("/chats/:id/edit", async(req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

// Update route
app.put("/chats/:id", async (req, res) =>{
    let {id} = req.params;
    let {msge: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msge: newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
})

// Delete route
app.delete("/chats/:id" , async (req, res) =>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(8080, () =>{
    console.log("server is listening");
})