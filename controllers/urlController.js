const Url = require("../models/url");
const shortid = require("shortid");

exports.createUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  try {
    const newUrl = new Url({
      user: req.user.id,
      originalUrl,
      shortUrl,
    });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user.id });
    res.json(urls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateUrl = async (req, res) => {
  const { id, newUrl } = req.body;
  try {
    let url = await Url.findById(id);
    if (!url) {
      return res.status(404).json({ msg: "URL not found" });
    }
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    url.originalUrl = newUrl;
    await url.save();
    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteUrl = async (req, res) => {
  const { id } = req.body;
  try {
    let url = await Url.findById(id);
    if (!url) {
      return res.status(404).json({ msg: "URL not found" });
    }
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await Url.deleteOne({ _id: id });
    res.json({ msg: "URL removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (!url) {
      return res.status(404).json({ msg: "URL not found" });
    }
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
