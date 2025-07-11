// const express = require("express")  //express imported
// const todomodel = require("./todo");
// const mongoose = require("mongoose")
// const cors = require("cors");

// const app = express();        //creates a express application
// app.use(cors());                // To allow frontend access
// app.use(express.json());            // Middleware to parse JSON

// //db connection
// mongoose
// .connect("mongodb+srv://bodarukmini:rukmini123@database.ru5klok.mongodb.net/Todo_list?retryWrites=true&w=majority&appName=Database")
// .then((res) = console.log("connection successfully to MongoDB"))
// .catch((err) => console.log(err));

// //create a new todo
// app.post("/add",(req,res)=>{
//     const task = req.body.task;
//     todomodel.create({
//         task: task,
//     }).then((res) => console.log("Created Successfully"))
//     .catch((err) => console.log("Unable to create"));
// })

// //start the server
// app.listen(3002, () => console.log("server is running fine"));
