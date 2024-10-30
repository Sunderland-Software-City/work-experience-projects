import express from "express";

const apiRoutes = express.Router();

// TODO Write your API code here.
apiRoutes.get("/", (req, res) => {
  console.log("Add some API handling here!");

  return res.json({ hello: "world!" });
});

export default apiRoutes;
