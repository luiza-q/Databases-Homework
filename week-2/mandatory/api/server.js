const express = require("express");
const app = express();

const { Pool } = require("pg");
const connection = new Pool({
  user: "postgres",
  database: "cyf_ecommerce",
  password: "myPassword123*",

  host: "localhost",
  port: 5432,
});

app.get("/customers", (request, response) => {
  connection.query("select * from customers", (error, result) => {
    response.json(result.rows);
  });
});

app.get("/suppliers", (request, response) => {
    connection.query("select * from suppliers", (error, result) => {
      response.json(result.rows);
    });
});

app.get("/products", (request, response) => {
    connection.query(
        "SELECT p.product_name as product, s.supplier_name as supplier FROM products as p INNER JOIN suppliers as s ON s.id=p.supplier_id", (error, result) => {
      response.json(result.rows);
    });
  });


const port = 4000;
app.listen(port, () => console.log(`app listening to port: ${port}`));
