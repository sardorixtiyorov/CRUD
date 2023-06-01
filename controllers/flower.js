const db = require("../config/db");

exports.getAllFlowers = (req, res) => {
  db.query("SELECT * FROM flowers", (error, results, fields) => {
    if (error) {
      console.log("Error retrieving flower:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    res.json(results);
    // console.log(fields);
  });
};

exports.createFlower = (req, res) => {
  const { name, colour, price } = req.body;
  db.query(
    "INSERT INTO flowers (name, colour, price) VALUES (?,?,?)",
    [name, colour, price],
    (error, results) => {
      if (error) {
        console.log("Error creating flower:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      res.json({
        message: "Flower created successfully",
        flowerid: results.insertId,
      });
    }
  );
};

exports.getFlowerById = (req, res) => {
  const flowerid = req.params.id;
  db.query(
    "SELECT * FROM flowers WHERE id =?",
    [flowerid],
    (error, results, fields) => {
      if (error) {
        console.log("Error retrieving flower:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: "Flower not found",
        });
      }
      res.json(results[0]);
    }
  );
};

exports.updateFlowerById = (req, res) => {
    const flowerid = req.params.id;
    const { name, colour, price } = req.body;
    db.query(
      "UPDATE flowers SET name =?, colour =?, price =? WHERE id =?",
      [name, colour, price, flowerid],
      (error, results) => {
        if (error) {
          console.log("Error updating flower:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Flower not found",
          });
        }
        res.json({
          message: "Flower updated successfully",
        });
      }
    );
};

exports.deleteFlowerById = (req, res) => {
    const flowerid = req.params.id;
    db.query(
      "DELETE FROM flowers WHERE id =?",
      [flowerid],
      (error, results) => {
        if (error) {
          console.log("Error deleting flower:", error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Flower not found",
          });
        }
        res.json({
          message: "Flower deleted successfully",
        });
      }
    );
};

