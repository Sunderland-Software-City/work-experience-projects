import express from "express";
import cors from "cors";
import homeRouter from "./routes/homeRouter.js";
import addNewRouter from "./routes/addNewRouter.js";
import flashcardRouter from "./routes/flashcardRouter.js";
import nunjucks from "nunjucks";

const APP_PORT = process.env.APP_PORT ?? 3000;
const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
	}),
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

// routes
app.use("/", homeRouter);
app.use("/add-new", addNewRouter);
app.use("/flashcard", flashcardRouter);

// store state in app.locals
app.locals.flashcards = [
	{
		name: "First One",
		slug: "first-one",
		questions: [
			{
				q: "q1",
				a: "a1",
			},
			{
				q: "q2",
				a: "a2",
			},
		],
	},
];
app.locals.questionIndex = 0;
app.locals.correctAnswersCount = 0;

// config view engine
nunjucks.configure("views", {
	autoescape: true,
	express: app,
});

app.listen(APP_PORT, () => {
	console.log("App is listening at port: ", APP_PORT);
});
