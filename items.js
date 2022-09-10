const express = require("express");
const router = new express.Router();
const ExpressError = require("./error");
const items = require("./fakeDb");

router.get("/", (req,res) => {
    res.json({items});
})

router.post("/", (req,res,next) => {
    try{
        if(!req.body.name) throw new ExpressError("Cannot be empty", 400);
        const newItem = ({name: req.body.name,
                        price: req.body.price});
        items.push(newItems);
        res.status(201).json({item: newItem});
    } catch(err) {
        next(err);
    }
})

router.get("/:name", (req,res) => {
    try{
        const found = items.find(item => item.name === req.params.name);
        if(found === undefined) throw new ExpressError("Item not found", 404);
        return res.json({item:found});
    }catch(err){
        next(err);
    }
})

router.patch("/:name", (req,res) => {
    try{
        const found = items.find(item => item.name === req.params.name);
        if(found === undefined) throw new ExpressError("Item not found", 404);
        found.name = req.body.name;
        return res.json({updated:found});
    }catch(err){
        next(err)
    }
})

router.delete("/:name", (req,res) => {
    try{
        const found = items.find(item => item.name === req.params.name);
        if(found === -1) throw new ExpressError("Item not found", 404);
        items.splice(found,1);
        return res.json({message:"Deleted"});
    }catch(err){
        next(err)
    }
})