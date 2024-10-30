# To Do

## Phase 1: Project Initialization and Basic File Structure
Goal: Set up the project structure, a basic server, and a static HTML file.

Ticket: Set up the project folder and initialize the main file structure.

#### Terminal:

```
mkdir tea-roulette
cd tea-roulette
npm init -y
npm install express
mkdir public
touch public/id.html server.js
```

##### Ticket: Create a basic HTML template and set up an Express server.

Code a simple server.js to start the server.
##### Terminal:
```
node server.js
Output: Verify the server is running at http://localhost:3000.
Ticket: Integrate a design framework (e.g., Bootstrap) for UI and CSS.
```

##### Terminal:

`npm install bootstrap`

## Phase 2: Static Page Design and Basic UI
Goal: Set up a static HTML page with the initial UI for tea preference input.

##### Ticket: Design core UI components on id.html (Tea Preferences List, Spinner Wheel, Tea-Maker Display, Add New Person Modal).

##### Ticket: Create a CSS file (style.css) for basic styling, including spinner animations.

##### Terminal:

`touch public/style.css`

##### Ticket: Implement minimal CSS and JavaScript to enable a functional form as per Progressive Enhancement principles.

Set up initial add and remove functions for the form.

## Phase 3: Backend API Development
Goal: Develop a CRUD API to handle tea preferences and introduce dynamic content.

##### Ticket: Set up GET /api/preferences API to retrieve the list of current preferences.

##### Ticket: Create POST /api/preferences API to add a new person’s preferences as JSON data.

##### Ticket: Add DELETE /api/preferences/all and DELETE /api/preferences/:id endpoints.

##### Terminal:

` touch public/data.json ` # JSON file for storing preference data

##### Ticket: Implement ensureDataFile function in server.js to check for data file existence.

## Phase 4: Dynamic Content and JavaScript Enhancement
Goal: Add JavaScript to dynamically load and display content, enhancing the form’s functionality.

##### Ticket: Set up a script.js file to dynamically populate and update the list of preferences using API.

##### Terminal:

` touch public/script.js `

##### Ticket: Implement JavaScript functions to handle list updates and the addition of new people.

##### Ticket: Retrieve JSON data via API and display it on the page.

## Phase 5: Spinner Animation and User Interaction
Goal: Add spinner animation and display the selected person using JavaScript for better user engagement.

##### Ticket: Integrate spin animation for the spinBtn and control it with JavaScript.

##### Ticket: Display the selected tea maker on screen after the spin is complete.

##### Ticket: Add JavaScript controls to disable the spinBtn while the wheel is spinning.

## Phase 6: Advanced Error Handling and Notifications
Goal: Enhance error handling and user notifications to create a consistent experience.

##### Ticket: Improve error handling in showError function to display user-friendly error messages on failures.

##### Ticket: Add notification messages when a new person is successfully added via the API.

## Phase 7: Testing and Performance Enhancements
Goal: Conduct final tests, address bugs, and optimize performance.

##### Ticket: Test all components and endpoints, ensuring the spinner and database updates function correctly.

##### Ticket: Create a README.md with all necessary terminal commands and project instructions.

##### Ticket: Perform final code cleanup by removing unnecessary code and logs.

## Phase 8: Deployment and Final Documentation
Goal: Deploy the project and complete all documentation for team and user reference.

##### Ticket: Deploy the project to a platform (e.g., Heroku or Vercel).

#### Bootstrap CSS (for styling and layout)

Link: Bootstrap 5.3 CSS
This stylesheet provides the core Bootstrap layout, typography, and component styles.

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
Bootstrap Bundle with Popper (for JavaScript components)

Link: Bootstrap 5.3 JavaScript Bundle
This JavaScript bundle includes all Bootstrap JavaScript plugins as well as Popper.js for positioning tooltips, dropdowns, and popovers.
html
Copy code

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

Bootstrap Icons (for adding icons to buttons and components)

Link: Bootstrap Icons 1.11.1
This icon library is a set of open-source icons designed to be used with Bootstrap.
html
Copy code

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet" />
