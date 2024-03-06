const mongoose = require("mongoose");
const Chat = require("./Models/chat.js");

main().then((res) =>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats =  [{
    from: "Neha",
    to: "Priya",
    msge: "Send me your exam sheet",
    created_at: new Date()  
},
{
    from: "Rohit",
    to: "Mohit",
    msge: "teach me JS callback",
    created_at: new Date() 
},
{
    from: "Amit",
    to: "Sumit",
    msge: "all the best",
    created_at: new Date() 
}
]

Chat.insertMany(allChats);

