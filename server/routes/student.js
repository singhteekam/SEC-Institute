const express = require("express");
const { getProfileInfo, contactUs } = require("../controllers/studentController");
// const { createCommunityPost, getAllCommunityPosts, getCommunityPost, addReplyToCommunityPost } = require("../controllers/communityController");
const router = express.Router();
// const authenticate = require("../middlewares/authenticate");
router.get("/profile", getProfileInfo);

router.post("/contactus", contactUs);

module.exports = router;