require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandlling");
const mongoose = require("mongoose");

// middleware
app.use(express.json());

// routes
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);
app.use("/api/users", userRoutes);

// mongoose Connection
mongoose
  .connect(process.env.link)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected to DB & Listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
