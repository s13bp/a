require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


//Routes 
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/upload'));
app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));


// Connect to mongodb 
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB')
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
    console.log("Express server launched...");
  });