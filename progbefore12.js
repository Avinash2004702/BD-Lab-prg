const express = require("express");

const app = express();

app.use(express.json());

let students = [];

// Add Student
app.post("/students", (req, res) => {

    students.push(req.body);

    res.send("Student Added");

});

// View Students
app.get("/students", (req, res) => {

    res.send(students);

});

app.listen(3000, () => {
    console.log("Server Running...");
});
