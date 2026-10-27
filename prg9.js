const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Put your NEW OpenWeatherMap API key here
const API_KEY = "ef1daa2b155c13a615b7c21f77644d34";

// Home Route
app.get("/", (req, res) => {
    res.send("Weather API Running...");
});

// Weather Endpoint
app.get("/weather", async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            message: "Please provide a city name."
        });
    }

    try {

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const weather = response.data;

        res.json({
            city: weather.name,
            country: weather.sys.country,
            temperature: weather.main.temp + " °C",
            humidity: weather.main.humidity + "%",
            weather: weather.weather[0].main,
            description: weather.weather[0].description
        });

    } catch (error) {

        console.log(error.response?.data);

        res.status(500).json({
            message: "Weather API Error",
            error: error.response?.data || error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});