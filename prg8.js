const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const USERNAME = "admin";
const PASSWORD = "12345";
app.get('/', (req, res) => {
    res.send("Login API is Running...");
});
app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        return res.status(200).json({
            success: true,
            message: "Login Successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
    });

});
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});