# Flash Card App

This webapp is a simple Express app with JavaScript, with Nunjucks as a view engine and vanilla CSS. The baseline functionalities should include:

1. See all available Flashcards
2. See all questions and answers of each Flashcard
3. Add a new Flashcard with 2 or more question-answer pairs
4. Start a _game_, where the app will prompt users for answers to questions
5. Give feedback to user - whether they answered correctly or not
6. Report how many answers were correct after every game

After these features are completed, feel free to extend the app! Here are some ideas:

1. Add data persistence to the app. Where will you store the data? How and where are you going to access the data in the app flow?
2. What if users want to keep playing when they answered all the questions for better recall practice?
3. What if users want to see and compare their previous attempt of using the Flashcard?
4. Make the Flashcard game more challenging by randomizing the order of the questions in the game.
5. Does your app have FOUC (Flash of Unstyled Content)? Research what it is and how to eliminate it.
6. Validate user input. What if the answer contains whitespace in the beginning or end?
7. Replace alerts with a custom modal for a more engaging and immersive user experience.
8. Add user authentication functionality.

## Prerequisites

1. Have Node installed. Run `node -v` in your terminal to check if Node is installed in your system.
2. Have `git` installed. Run `git -v` in your terminal to check if `git` is installed in your system.

## Setup

1. Clone this repo with `git clone`.
2. Install all the required packages by running `npm install`. (Tip: you can just run `npm i` to save 6 keystrokes!! ^-^)
3. Open this project in `VSCode`, and install the recommended extensions.
4. Run `npm run start`. This will run `nodemon index.js` in the terminal to start up the Express server (look at the "scripts" in `package.json`). `nodemon` restarts the server on every change in the directory (file save). This will eliminate the need to restart the Express server after every change.
5. Access the website by going to `http://localhost:1234/`.

And you're all setup! The files are filled with comments such as `TODO:` as hints. These serve as guides to aid in your development. Have fun!
