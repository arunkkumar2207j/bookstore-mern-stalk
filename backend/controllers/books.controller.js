const Book = require("../models/book.model");

const getData = async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

const postData = async (req, res) => {
    const { title, author, publishYear } = req.body
    try {
        if(!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Send all required fields, title, author and publishYear"
            })
        } else {
            const newBook = {
                title,
                author,
                publishYear
            }
            const book = await Book.create(newBook)
            res.status(201).send(book)
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

const findData = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
        res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

const updateData = async (req, res) => {
    const { title, author, publishYear } = req.body
    try {
        if(!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Send all required fields, title, author and publishYear"
            })
        } 
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate({_id:id}, req.body)
        if(!result) {
            return res.status(404).send({message: "book not found"})
        } else {
            res.status(201).send({message: "book updated successfully"})
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete({_id:id})
        if(!result) {
            return res.status(404).send({message: "book not found"})
        } else {
            res.status(201).send({message: "book deleted successfully"})
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

module.exports = {
    getData,
    postData,
    findData,
    updateData,
    deleteData
}