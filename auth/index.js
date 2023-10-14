const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const PORT = process.env.PORT || 5000

const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://root:root@cluster0.iyw07xh.mongodb.net/`).then(console.log("database connection"))
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()