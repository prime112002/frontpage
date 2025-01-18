const express = require("express");
const { getRecentStories } = require("../services/storyService");

const router = express.Router();
// RESTAPI  endpoints !
router.get("/stories", async (req, res) => {
  try {
    const stories = await getRecentStories();
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

module.exports = router;
