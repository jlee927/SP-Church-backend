require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const contentful = require("./routes/contentful");
const database = require("./routes/database");

const mongoose = require("mongoose");
const dbURI =
   "mongodb+srv://jin:ji9gvys4@cluster0.gimvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/contentful", contentful);
app.use("/data", database);

app.get("/", (req, res) => {
   res.send("Hello world 2");
});

mongoose.connect(dbURI).then((result) => {
   app.listen(PORT, (error) => {
      if (!error)
         console.log(
            "Server is Successfully Running, and App is listening on port " +
               PORT
         );
      else console.log("Error occurred, server can't start", error);
   });
});
