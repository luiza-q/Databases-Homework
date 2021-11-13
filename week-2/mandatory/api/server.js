const express = require("express");
const app = express();
const port = 4000;
const apiFunction = require("./api.js");
const api = apiFunction();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//get endpoints
app.get("/customers", api.getAllCustomers);
app.get("/suppliers", api.getAllSuppliers);
app.get("/products", api.getProducts);
app.get("/customers/:customerId", api.getCustomerById);
app.get("/customers/:customerId/orders", api.getOrderDetails);

//post endpoints
app.post("/customers", api.insertNewCustomer);
app.post("/products", api.insertNewProduct);
app.post("/customers/:customerId/orders", api.insertNewOrder);

//put endpoints
app.put("/customers/:customerId", api.updateCustomer);

//delete endpoints
app.delete("/orders/:orderId", api.deleteOrder);
app.delete("/customers/:customerId", api.deleteCustomer);


app.listen(port, () => console.log(`app listening to port: ${port}`));
