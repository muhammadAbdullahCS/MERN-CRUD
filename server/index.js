const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/crud");

// -------------------------- MONGODB API START FROM HERE -------------------------------

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/createuser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

app.get("/getuser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Statusss: err });
  }
});

// app.put("/updateuser/:id", (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndUpdate(
//     { _id: id },
//     { name: req.body.name, email: req.body.email, age: req.body.age }
//   )
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
// });

app.put("/updateuser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name: req.body.name, email: req.body.email, age: req.body.age },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});

app.listen(3001, () => {
  console.log("Server is running on 3001");
});
