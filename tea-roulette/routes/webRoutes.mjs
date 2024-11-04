// routes/webRoutes.mjs
import express from "express";

const webRoutes = express.Router();

// GET route to render the index.njk template
webRoutes.get("/", (req, res) => {
  res.render("index.njk");
});

export default webRoutes;
