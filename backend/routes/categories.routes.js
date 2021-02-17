const express = require("express");
const Category = require("../models/category");
const router = express.Router();

module.exports = router;

//Find all
router.get("/", async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch {
        res.status(500).json({ message: err.message });
    }
});

//Find one
router.get("/:id", getCategory, (req, res) => {
    res.send(res.category);
});

//Create
router.post("/", async (req, res) => {
    const category = new Category({
        category: req.body.category,
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Update
router.patch("/:id", getCategory, async (req, res) => {
    if (req.body.content != null) {
        res.category.content = req.body.content;
    }
    if (req.body.author != null) {
        res.category.author = req.body.author;
    }
    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete
router.delete("/:id", getCategory, async (req, res) => {
    try {
        await res.category.remove();
        res.json({ message: "Deleted Category" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCategory(req, res, next) {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category === null) {
            res.status(404).json({ message: "Cannot find category" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.category = category;
    // //console.log(category)
    next();
}
