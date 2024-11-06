const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get('/', postController.findAll); 
router.post('/', postController.createPost); // app.post("/",(req,res)=>{})
router.get('/:id', postController.findPostById); 
router.put('/:id', postController.updatePost); 
router.delete('/:id', postController.deletePost); 

module.exports = router;