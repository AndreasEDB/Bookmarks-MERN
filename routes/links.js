const express = require("express");
const Link = require("../models/link");
const Category = require('../models/category')
const router = express.Router();
// const ogData = require('../scripts/ogData')
const og = require('open-graph');
const captureWebsite = require("capture-website");

module.exports = router;

//Find all
router.get("/", async (req, res) => {
    try {
        let link = await Link.find().populate('category');
        // for (i in link) {
        //     link[i].category = await Category.findById(link[i].category);
        // }
        // console.log(link.length)
        res.json(link);
    } catch {
        res.status(500).json({ message: err.message });
    }
});
router.get("/categories/", async (req, res) => {
    try {
        const link = await Category.find();
        res.json(link);
    } catch {
        res.status(500).json({ message: err.message });
    }
});

//Find one
router.get("/:id", getLink, (req, res) => {
    // console.log(res)
    res.send(res.link);
});

router.get("/categories/:id", getCategory, (req, res) => {
    res.send(res.category);
});

//Create
router.post("/", getMeta, async (req, res) => {
    console.log(res.metadata)
    let title = req.body.title
    let linkDescription = req.body.linkDescription
    let linkImg = ''
    res.metadata.title && (title = res.metadata.title)
    res.metadata.description && (linkDescription = res.metadata.description)

    if (res.metadata.image && res.metadata.image.url.indexOf('http') > -1) {
        linkImg = res.metadata.image.url
    } else {
        let fileName = `${req.body.category.category + Date.now()}.png`
        let filePath = `./public/assets/screenshots/${fileName}`
        await captureWebsite.file(req.body.linkUrl.indexOf('http') > -1 ? req.body.linkUrl : 'http://' + req.body.linkUrl, filePath, {scaleFactor: 0.7})
        linkImg = filePath
    }

    const link = new Link({
        title: title,
        linkDescription: linkDescription,
        linkUrl: req.body.linkUrl,
        linkImg: linkImg,
        category: req.body.category
    });
    console.log(res.metadata.linkUrl)

    try {
        const newLink = await link.save();
        res.status(201).json(newLink);
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
router.patch("/:id", getLink, async (req, res) => {
    if (req.body.title != null) {
        res.link.title = req.body.title;
    }
    if (req.body.linkDescription != null) {
        res.link.linkDescription = req.body.linkDescription;
    }
    if (req.body.linkUrl != null) {
        res.link.linkUrl = req.body.linkUrl;
    }
    if (req.body.category != null) {
        res.link.category = req.body.category;
    }
    try {
        const updatedLink = await res.link.save();
        res.json(updatedLink);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete
router.delete("/:id", getLink, async (req, res) => {
    try {
        await res.link.remove();
        res.json({ message: "Deleted Link" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getLink(req, res, next) {
    let link;
    try {
        link = await Link.findById(req.params.id);
        link.category = await Category.findById(link.category);
        if (link === null) {
            res.status(404).json({ message: "Cannot find link" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.link = link;
    next();
}

async function getMeta(req, res, next) {
    let metadata
    try {
        og(req.body.linkUrl, (err, meta) => {
            res.metadata = meta
            next()
        })
    } catch (err) {
        console.log('Error: ' + err)
    }
    
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
