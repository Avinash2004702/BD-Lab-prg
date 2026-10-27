const express = require("express");

const app = express();

app.use(express.json());

let students = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Student API Running...");
});

// Add Student
app.post("/students", (req, res) => {

    const { name, course } = req.body;

    if (!name || !course) {

        return res.status(400).json({
            success: false,
            message: "Name and Course are required."
        });

    }

    const student = {
        id: students.length + 1,
        name,
        course
    };

    students.push(student);

    res.status(201).json({
        success: true,
        message: "Student Added Successfully",
        data: student
    });

});

// View Students
app.get("/students", (req, res) => {

    res.status(200).json({
        success: true,
        totalStudents: students.length,
        data: students
    });

});

app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});

