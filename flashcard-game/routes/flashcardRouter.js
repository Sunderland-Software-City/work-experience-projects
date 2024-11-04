import express from 'express';
const router = express.Router();

// show flashcard information
router.get('/', (req, res) => {
	// todo: find flashcard from the app's flashcards with the same 'slug' as the url param
	// hint: you can get url param by req.query.x, where x = name of the url query param
	// todo: add all the information needed to render "flashcard.njk"
	res.render('flashcard.njk', {});
});

// start game
router.get('/start', (req, res) => {
	// todo: find flashcard from the app's flashcards with the same 'slug' as the url param

	// todo: get current questionIndex from app's locals

	// todo: render the question based on the questionIndex
	// hint: check the structure of the flashcard object from the app's locals state in index.js
	res.render('start.njk', { question: 'todo: replace me with the actual question!' });
});

// check user guess
// check user guess
router.post('/start', (req, res) => {
	// todo: get the answer of the user input
	// todo: get the answer of the current question using the app's questionIndex

	// todo: increment the questionIndex

	// todo: check if game is finished
	// hint: it uses the app's questionIndex and comparing it with how many questions does a flashcard have

	// check if answer is correct
	if (answer === userAnswer) {
		// todo: increment the app's correctAnswersCount

		// todo: render "answer.njk", with all the correct properties
		res.render('answer.njk', {
			slug: '',
			correctAnswer: '',
			userAnswer: '',
			correct: '',
			finished: '',
			totalQuestions: '',
			correctAnswersCount: '',
		});
	} else {
		// todo: render "answer.njk", with all the correct properties
		res.render('answer.njk', {
			slug: '',
			correctAnswer: '',
			userAnswer: '',
			correct: '',
			finished: '',
			totalQuestions: '',
			correctAnswersCount: '',
		});
	}

	//todo: reset app's locals  if game is finished
});

export default router;
