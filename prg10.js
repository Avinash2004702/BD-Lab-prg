const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = 3000;

// n8n webhook URL
const WEBHOOK_URL = "http://localhost:5678/webhook/student-data";

app.post("/send", async (req, res) => {
    try {
        const response = await axios.post(WEBHOOK_URL, req.body);

        console.log("Response from n8n:", response.data);

        res.json({
            message: "Data Sent Successfully",
            workflowResponse: response.data
        });
    } catch (error) {
        console.error("Error sending data to n8n:", error.message);

        res.status(500).json({
            message: "Error sending data to n8n",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});