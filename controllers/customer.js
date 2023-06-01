const db = require("../config/db");

exports.getAllCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      console.log("Error retrieving customers:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    res.json(results);
  });
};

exports.createCustomer = (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO customers (name, email) VALUES (?,?)",
    [name, email],
    (error, results) => {
      if (error) {
        console.log("Error creating customer:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      res.json({
        message: "Customer created successfully",
        customerId: results.insertId,
      });
    }
  );
};

exports.getCustomerById = (req, res) => {
  const customerID = req.params.id;
  db.query(
    "SELECT * FROM customers WHERE id =?",
    [customerID],
    (error, results) => {
      if (error) {
        console.log("Error retrieving customer:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: "Customer not found",
        });
      }
      res.json(results[0]);
    }
  );
};

exports.updateCustomer = (req, res) => {
    const customerID = req.params.id;
    const { name, email } = req.body;
    db.query(
      "UPDATE customers SET name =?, email =? WHERE id =?",
      [name, email, customerID],
      (error, results) => {
        if (error) {
          console.log("Error updating customer:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Customer not found",
          });
        }
        res.json({
          message: "Customer updated successfully",
        });
      }
    );
};

exports.deleteCustomer = (req, res) => {
    const customerID = req.params.id;
    db.query(
      "DELETE FROM customers WHERE id =?",
      [customerID],
      (error, results) => {
        if (error) {
          console.log("Error deleting customer:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Customer not found",
          });
        }
        res.json({
          message: "Customer deleted successfully",
        });
      }
    );
};

