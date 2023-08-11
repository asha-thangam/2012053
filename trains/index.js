const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const userRoute = require('./routes/user')
const app = express();
app.use(bodyParser.json());
dotenv.config();
mongoose.connect("mongodb://127.0.0.1:27017/affordmed", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/train/register',userRoute)

app.listen(5000, () => {
    console.log("Server is running")
});
