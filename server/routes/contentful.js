const {
   getAnnouncements,
   getSlideshow,
   getSingleAnnouncement,
   getAllSermonAnnouncement
} = require("../controllers/contenful");

const express = require("express");
const router = express.Router();

//slide show routes
router.get("/slideshow", getSlideshow);

//news routes
router.get("/all-news-announcement", getAnnouncements);
router.get("/single-news-announcement/:id", getSingleAnnouncement);

//sermon routes
router.get("/all-sermon-announcement/:content_type", getAllSermonAnnouncement)
module.exports = router;
