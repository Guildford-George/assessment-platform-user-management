import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"

dotenv.config()
const app= express()

const PORT= process.env.PORT || 3000

app.use(morgan("dev"))
// health check
app.get("/", (req, res)=>{
    res.send({
        success: "ok",
        message: "User Management Service"
    })
})

app.listen(PORT, ()=>{console.log("User Management service running")})