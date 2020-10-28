const express = require("express");
const Quote = require("../models/quote");
const Category = require('../models/category')
const router = express.Router();

module.exports = router;

//Find all
router.get("/", async (req, res) => {
    try {
        let quote = await Quote.find();
        for (i in quote) {
            quote[i].category = await Category.findById(quote[i].category);
        }
        // console.log(quote.length)
        res.json(quote);
    } catch {
        res.status(500).json({ message: err.message });
    }
});
router.get("/categories/", async (req, res) => {
    try {
        const quote = await Category.find();
        res.json(quote);
    } catch {
        res.status(500).json({ message: err.message });
    }
});

//Find one
router.get("/:id", getQuote, (req, res) => {
    // console.log(res)
    res.send(res.quote);
});

router.get("/categories/:id", getCategory, (req, res) => {
    res.send(res.category);
});

//Create
router.post("/", async (req, res) => {
    const quote = new Quote({
        title: req.body.title,
        quoteText: req.body.quoteText,
        quoteAuthor: req.body.quoteAuthor,
        category: req.body.category
    });

    try {
        const newQuote = await quote.save();
        res.status(201).json(newQuote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post("/categories/", async (req, res) => {
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
router.patch("/:id", getQuote, async (req, res) => {
    if (req.body.title != null) {
        res.quote.title = req.body.title;
    }
    if (req.body.quoteText != null) {
        res.quote.quoteText = req.body.quoteText;
    }
    if (req.body.quoteAuthor != null) {
        res.quote.quoteAuthor = req.body.quoteAuthor;
    }
    if (req.body.category != null) {
        res.quote.category = req.body.category;
    }
    try {
        const updatedQuote = await res.quote.save();
        res.json(updatedQuote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete
router.delete("/:id", getQuote, async (req, res) => {
    try {
        await res.quote.remove();
        res.json({ message: "Deleted Quote" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getQuote(req, res, next) {
    let quote;
    try {
        quote = await Quote.findById(req.params.id);
        quote.category = await Category.findById(quote.category);
        if (quote === null) {
            res.status(404).json({ message: "Cannot find quote" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.quote = quote;
    next();
}

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
    // console.log(category)
    next();
}
