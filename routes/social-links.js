const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Hello from express");
  const socialLinks = [
    {
      id: 100,
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/venkatsandeep-b-8a4178a6/"
    },
    {
      id: 101,
      name: "Twitter",
      path: "https://twitter.com/iamvenkat45"
    }
  ];
  res.status(200).json({
    socialLinks: socialLinks
  });
});

module.exports = router;