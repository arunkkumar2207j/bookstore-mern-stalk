const express = require("express")
const router = express.Router();
const { getData, postData, deleteData, updateData, findData } = require("../controllers/books.controller")

router.get("/", getData)

router.post("/", postData)

// Route book by id
router.get("/:id", findData)

// Route book update
router.put("/:id", updateData)

// Route delete book
router.delete("/:id", deleteData)

module.exports = router;