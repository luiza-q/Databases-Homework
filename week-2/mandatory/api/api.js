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

    const getProducts = async (req, res) => {
      try{
        const searchProduct = req.query.searchProduct;
        if(searchProduct) {
          productQuery = await pool.query (`select * from products where product_name like '%${searchProduct}%'`
          );
          if (productQuery.rows.length > 0) {
            return res.send(productQuery.rows);
          } else {
            return res.status(404).send('product not found')
          }
        } else {
          const result = await pool.query(`select * from products`);
          return res.status(200).send(result.rows)        }

      } catch(err){
        console.log(err);
      }
    };

    const getCustomerById = (req, res) => {
        const customerId = req.params.customerId;
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
       
        if (!Number.isInteger(newProductPrice) || newProductPrice <= 0 || newProductSupplierId.rows.length === 0) {
           return res
             .status(400)
             .send("Product is not valid: price must be positive and supplier must exist");
        } else {
            const query = "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
            pool
           .query(query, [newProductName, newProductPrice, newProductSupplierId])
           .then(() => res.status(201).send("Customer created!"))
           .catch((e) => console.error(e));
        }
    }

    const insertNewOrder = async (req, res) => {
      const customerId = req.params.customerId;
      const newOrderDate = req.body.order_date;
      const newOrderRef = req.body.order_reference;
      
      const checkCustomerId = await pool.query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
      if (checkCustomerId > 0) {
        return res.status(400).send("Please choose an existing customer");
        } 
          
      const query = "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";
      const result = await pool.query(query, [newOrderDate, newOrderRef, customerId])
              
      return res.status(200).send("Order created!").json(result.rows);
            
    }
    
    const updateCustomer = async (req, res) => {
      try {
        const customerId = req.params.customerId;
        const customer = req.body;
        const query = "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5;";
        const result = await pool.query(query, [
          customer.name, 
          customer.address, 
          customer.city, 
          customer.country, 
          customerId]);  
        return res.status(200).send("Customer updated").json(result.rows);
      }
      catch (e){
          return res.status(500).send("Error");
      }
    }

    const deleteOrder = async (req, res) => {
      try {
        const orderId = req.params.orderId;
        const queryOrdersItems = "delete from order_items where order_id=$1";
        const queryOrders = "delete from orders where id=$1;";
        await pool.query(queryOrdersItems, [orderId]);
        const result = await pool.query(queryOrders, [orderId]);
        return res.status(200).send("order deleted").json(result.rows);
      }
      catch (e){
          return res.status(500).send("Error");
      }

    }

    const deleteCustomer = async (req, res) => {
      try{
        const customerId = req.params.customerId;
        const queryOrders = "select * from orders where customer_id=$1"
        const checkOrders = await pool.query(queryOrders, [customerId]);
        if (checkOrders.rows.length > 0) {
          return res.status(400).send("Cannot delete customer: customer has active orders");
        } else {
          const queryCustomer = "delete from customers where id=$1"
          const result = await pool.query(queryCustomer, [customerId]);
          return res.status(200).send("customer deleted").json(result.rows);
        }

      }
      catch (e){
        return res.status(500).send(e);
      }

    }

    const getOrderDetails = async (req, res) => {
      try{
      const customerId = req.params.customerId;
      const query = `select c.name as customerName, o.order_reference, o.order_date, 
      p.product_name, p.unit_price, s.supplier_name, i.quantity 
      from orders o inner join customers c on o.customer_id=c.id
      inner join order_items i on i.order_id=o.id
      inner join products p on i.product_id=p.id
      inner join suppliers s on s.id=p.supplier_id
      where c.id=$1`;
      const result = await pool.query(query, [customerId]);
      return res.status(200).json(result.rows);
      }
      catch (e) {
        return res.status(500).send(e);
      }

    }






    return {
      getAllCustomers,
      getAllSuppliers,
      getProducts,
      getCustomerById,
      insertNewCustomer,
      insertNewProduct,
      insertNewOrder,
      updateCustomer,
      deleteOrder,
      deleteCustomer,
      getOrderDetails
    };
};

module.exports = api;