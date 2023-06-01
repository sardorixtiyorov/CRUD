const express = require("express");

const router = express.Router();

const flowerController = require("../controllers/flower");

router.get("/", flowerController.getAllFlowers);

router.post("/", flowerController.createFlower);

router.get("/:id", flowerController.getFlowerById);

router.put("/:id", flowerController.updateFlowerById);

router.delete("/:id", flowerController.deleteFlowerById);

module.exports = router;
