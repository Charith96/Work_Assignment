//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//import routes
const memberRoute = require("./routes/Member_route");
const countryRoute = require("./routes/Country_route");

//invoke an express app
const app = express();

app.use(express.json());
app.use(cors());


//routes middleware
app.use("/v1/members", memberRoute);
app.use("/v1/countries", countryRoute);

require("dotenv").config();

//configure variable
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


app.listen(PORT, async () => {
    try {        
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true
        });
        console.log("MonoDB successfully connected 🔥🟢");        
        console.log(`Server is running on port ${PORT}`);

    } catch (error) {
        console.error("MongoDB connection error, please try agin latter ❗");
    }
})


