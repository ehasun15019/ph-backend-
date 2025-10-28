const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// cors use for connecting api with frontend
const cors = require("cors");
app.use(cors())


app.get("/", (req, res) => {
    res.send("Hello world")
})



// create some user for testing 
const users = [
  { id: 1, name: "Abu Ahmed", email: "abu@example.com" },
  { id: 2, name: "John Doe", email: "john@example.com" },
  { id: 3, name: "Jane Smith", email: "jane@example.com" }
];

app.get("/users", (req, res) => {
    res.send(users);
})

app.listen(port, () => {
    console.log(`my server is running on http://localhost:${port}`);
});

