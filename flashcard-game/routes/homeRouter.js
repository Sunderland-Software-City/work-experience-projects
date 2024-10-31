import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	// reset on questionIndex on load
	req.app.locals.questionIndex = 0;
	res.render("index.njk", {
		flashcards: req.app.locals.flashcards,
	});
});

export default router;
