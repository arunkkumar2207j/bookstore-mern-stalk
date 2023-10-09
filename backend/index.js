const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {PORT, MONGODB_URI} = require("./config.js")
const routerBooks = require("./routes/books.routes.js")

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))
app.use("/api/books", routerBooks);

app.get("/", (req, res) => {
    res.status(200).json({message: "Server working"})
})

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("DB Connected");
        app.listen(PORT, () => {
            console.log(`Server listening at port ${PORT}`)
        })
    })
    .catch((error) => {console.log(error)})