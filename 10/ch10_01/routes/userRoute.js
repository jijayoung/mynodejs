const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get('/', userController.findAll); // app.get("/",(req,res)=>{})
router.post('/', userController.createUser); // app.post("/",(req,res)=>{})

module.exports = router;