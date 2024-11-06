const express = require("express");
const userController = require("../controllers/userController");
const {check} = require("express-validator");
const router = express.Router();

router.get('/', userController.findAll); // app.get("/",(req,res)=>{})

router.post('/', [
    check('name').notEmpty().withMessage("Name is required"),
    check('email').notEmpty().withMessage("Email is required").isEmail().withMessage("invail email format")
],userController.createUser); // app.post("/",(req,res)=>{})

module.exports = router;