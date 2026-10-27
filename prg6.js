const express = require('express');

const app = express();

app.use(express.json());

// Middleware to log request method and URL
app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

// Product list
let products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 }
];

// GET API
app.get('/products', (req, res) => {
    res.json(products);
});

// POST API with Validation
app.post('/products', (req, res) => {

    const { name, price } = req.body;

    // Validation
    if (!name || name.trim() === "") {
        return res.status(400).json({
            error: "Product name cannot be empty"
        });
    }

    if (price <= 0) {
        return res.status(400).json({
            error: "Price must be greater than 0"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
