import express from "express";
import nunjucks from "nunjucks";
import "dotenv/config";
import api from "./routes/api.mjs";
import web from "./routes/web.mjs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.use("/api", api); // for services
app.use("/", web); // for students

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
});

app.set("view engine", "njk");

const PORT = process.env.PORT;

app.listen(3005, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

