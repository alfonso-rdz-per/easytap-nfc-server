const express = require("express");

const router = express.Router();

const { tap } = require("../controllers/tapController");

router.get("/tap/:id", tap);

module.exports = router;