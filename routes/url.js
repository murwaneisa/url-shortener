const express = require("express");
const router = express.Router();
const {
  createUrl,
  getUrls,
  updateUrl,
  deleteUrl,
  redirectUrl,
} = require("../controllers/urlController");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createUrl);
router.get("/dashboard", auth, getUrls);
router.put("/update", auth, updateUrl);
router.delete("/delete", auth, deleteUrl);
router.get("/:shortUrl", redirectUrl);

module.exports = router;
