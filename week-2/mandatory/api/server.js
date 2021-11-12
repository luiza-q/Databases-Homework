const express = require("express");
const app = express();
const port = 4000;
const apiFunction = require("./api.js");
const api = apiFunction();


app.get("/customers", api.getAllCustomers);
app.get("/suppliers", api.getAllSuppliers);
app.get("/products", api.getProductsAndSuppliers);
app.get("/customers/:customerId", api.getCustomerById); 

app.post("/customers", api.insertNewCustomer);
app.post("/products", api.insertNewProduct);


app.listen(port, () => console.log(`app listening to port: ${port}`));
