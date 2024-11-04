// Importing necessary modules using ESM syntax
import express from "express"; // Express framework for handling server and routes
import nunjucks from "nunjucks"; // Nunjucks templating engine
import preferencesRoutes from "./routes/preferencesRoutes.mjs"; // Preferences routes
import webRoutes from "./routes/webRoutes.mjs"; // Web routes

// Initialize Express application
const app = express();
const port = 3000; // Set port number for the server

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Use routes
app.use("/api/preferences", preferencesRoutes); // Preferences API routes
app.use("/", webRoutes); // Web routes for rendering index

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log the server URL
});
