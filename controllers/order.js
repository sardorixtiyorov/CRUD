const db = require("../config/db");

exports.getAllOrders = (req, res) => {
  db.query("SELECT * FROM orders", (error, results) => {
    if (error) {
      console.log("Error retrieving orders:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    res.json(results);
  });
};

exports.createOrder = (req, res) => {
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "INSERT INTO orders (customer_id,flower_id,quantity) VALUES (?,?,?)",
    [customer_id, flower_id, quantity],
    (error, results) => {
      if (error) {
        console.log("Error creating order:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      res.json({
        message: "Order created successfully",
        customerId: results.insertId,
      });
    }
  );
};

exports.getOrderByID = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM orders WHERE id =?", [id], (error, results) => {
    if (error) {
      console.log("Error retrieving order:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }
    res.json(results);
  });
};
exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "UPDATE orders SET customer_id =?,flower_id =?,quantity =? WHERE id =?",
    [customer_id, flower_id, quantity, id],
    (error, results) => {
      if (error) {
        console.log("Error updating order:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({
          error: "Order not found",
        });
      }
      res.json({
        message: "Order updated successfully",
      });
    }
  );
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM orders WHERE id =?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting order:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }
    res.json({
      message: "Order deleted successfully",
    });
  });
};
