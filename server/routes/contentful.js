const {
   getAnnouncements,
   getSlideshow,
   getSingleAnnouncement,
} = require("../controllers/contenful");

const express = require("express");
const router = express.Router();

router.get("/all-news-announcement", getAnnouncements);
router.get("/slideshow", getSlideshow);
router.get("/single-news-announcement/:id", getSingleAnnouncement);
module.exports = router;
