const express = require("express");
const routes = require("./items");
const ExpressError = require("./error");

const app = express();

app.use(express.json());
app.use("/items", routes);

//404 handler
app.use((req,res,next) => {
    return new ExpressError("There's nothing here :/", 404)
})
//global handler
app.use((err,req,res,next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message
    });
});

module.exports = app;