const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const todomodel = require("./todo");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://bodarukmini:rukmini123@database.ru5klok.mongodb.net/Todo_list?retryWrites=true&w=majority&appName=Database")
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.send({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.send({ message: "User Registered" });
  } catch (err) {
    res.status(500).send({ message: "Registration error", error: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(404).json({ success: false, message: "User not found" });
  }
});

// Get Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todomodel.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send({ message: "Error fetching todos" });
  }
});

// Add Todo
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;
    await todomodel.create({ task });
    res.send({ message: "Todo added" });
  } catch (err) {
    res.status(500).send({ message: "Error adding todo" });
  }
});

// Update todo
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  await todomodel.findByIdAndUpdate(id, { task });
  res.send({ message: "Updated" });
});

// Delete Todo
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todomodel.findByIdAndDelete(id);
    res.send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting todo" });
  }
});

// Start Server
app.listen(3002, () => console.log("Server running on port 3002"));
