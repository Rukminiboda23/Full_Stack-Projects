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

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash the password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration error", error: err.message });
  }
});


// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Login error", error: err.message });
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
