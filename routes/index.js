const express = require("express");

const router = express.Router();

const flowerRoutes = require("./flower");

const customerRoutes = require("./customer");

const orderRoutes = require("./order");

router.use("/flowers", flowerRoutes);

router.use("/customers", customerRoutes);

router.use("/orders", orderRoutes);

module.exports = router;
