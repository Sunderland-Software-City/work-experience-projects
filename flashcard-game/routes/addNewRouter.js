import express from "express";
import slugify from "../utilities/slugify.js";

const router = express.Router();

// gets
router.get("/", (req, res) => {
	// todo: render "add-new.njk" with appropriate object for parameters
	// hint: look at "add-new.njk" to see what variables are needed
});

router.get("/success", (req, res) => {
	// todo: render "success.njk"
});

// post
router.post("/", (req, res) => {
	// todo: get all the form data from req.body
	const name = req.body.name;

	// todo: slug should be a slugified-version of name
	const slug = slugify();

	// todo: change questions to an array of {q: string, a:string}
	// i.e. [{q: "Who's there?", a: "Me!"}, {q: "Hello?", a: "World"}]
	// tip: console.log() to see the what `questions` look like at first

	// make new flashcard
	const flashcard = {
		name: name,
		slug: slug,
		questions: questions,
	};

	// todo: add the new flashcard into the flashcards in req.app.locals

	res.redirect("add-new/success");
});

router.post("/add-question", (req, res) => {
	// todo: get all the form data from req.body
	// todo: change questions to an array of {q: string, a:string}
	// i.e. [{q: "Who's there?", a: "Me!"}, {q: "Hello?", a: "World"}]
	// tip: console.log() to see the what `questions` look like at first
	// todo: render "add-new.njk" with 'name' and 'questions'
});

export default router;
