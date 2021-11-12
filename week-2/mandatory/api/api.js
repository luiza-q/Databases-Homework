const api = () => {
    const { Pool } = require("pg");
    const pool = new Pool({
      user: "postgres",
      database: "cyf_ecommerce",
      password: "myPassword123*",
      host: "localhost",
      port: 5432,
    });

    const getAllCustomers = (req, res) => {
        pool.query("select * from customers", (error, result) => {
          res.json(result.rows)
        });
    };

    const getAllSuppliers = (req, res) => {
        pool.query("select * from suppliers", (error, result) => {
          res.json(result.rows);
        });
    };

    const getProductsAndSuppliers = (req, res) => {
        const name = req.query.name;
        pool.query(
            "SELECT p.product_name as product, s.supplier_name as supplier FROM products as p INNER JOIN suppliers as s ON s.id=p.supplier_id", (error, result) => {
          res.json(result.rows);
        });
    }

    const getCustomerById = (req, res) => {
        const customerId = req.params.id;
        pool
        .query(`SELECT * FROM customers where id=$1;`, [customerId])
          .then((result) => res.json(result.rows))
          .catch((e) => console.error(e));
    }

    const insertNewCustomer = (req, res) => {
        const newCustomerName = req.body.name;
        const newCustomerAddress = req.body.address;
        const newCustomerCity = req.body.city;
        const newCustomerCountry = req.body.country;
      
        pool
          .query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
          .then((result) => {
            if (result.rows.length > 0) {
              return res
                .status(400)
                .send("A customer with the same name already exists!");
            } else {
              const query =
                "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
              pool
                .query(query, [newCustomerName, newCustomerAddress, newCustomerCity, newCustomerCountry])
                .then(() => res.status(201).send("Customer created!"))
                .catch((e) => console.error(e));
            }
          });
    };

    const insertNewProduct = (req, res) => {
        const newProductName = req.body.product_name;
        const newProductPrice = req.body.unit_price;
        const newProductSupplierId = req.body.supplier_id;
       
        if (!Number.isInteger(newProductPrice) || newProductPrice <= 0) {
           return res
             .status(400)
             .send("Price should be a positive number");
        } else {
            const query = "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
            pool
           .query(query, [newProductName, newProductPrice, newProductSupplierId])
           .then(() => res.status(201).send("Customer created!"))
           .catch((e) => console.error(e));
        }
    }
        




    return {
        getAllCustomers,
        getAllSuppliers,
        getProductsAndSuppliers,
        getCustomerById,
        insertNewCustomer,
        insertNewProduct,
        

    };
};

module.exports = api;