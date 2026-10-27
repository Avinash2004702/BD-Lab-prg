const express = require('express');
const app = express();
app.use(express.json());


let products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
];


app.get('/products', (req, res) => {
    res.json(products);
});


app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
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

