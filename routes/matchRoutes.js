const express = require("express");
const matchController = require("../controller/matchController.js");

const router = express.Router();

router.get("/getAllMatches", matchController.getAllMatches);
router.get("/getMatchById/:id", matchController.getMatchById);
router.post("/addMatch", matchController.createMatch);
router.delete("/deleteMatch/:id", matchController.deleteMatch);
router.get("/getMatchByDate/:date", matchController.getMatchByDate);
router.patch("/updateMatch/:id", matchController.updateMatch);

module.exports = router;
