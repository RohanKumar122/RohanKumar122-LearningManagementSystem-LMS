import { connect } from "http2"
import {app} from "./app"
import connectDB from "./utils/db"
require("dotenv").config()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)    
    connectDB();
})