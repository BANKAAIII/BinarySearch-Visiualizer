const express = require("express");

const router = express.Router();

// creating custom routes

const userRouter = require("./user");
const searchRouter = require("./search");

// adding the routes to main router

router.use("/user",userRouter);
router.use("/search",searchRouter);

module.exports = router;