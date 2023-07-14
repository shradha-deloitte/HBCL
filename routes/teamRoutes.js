const express = require('express');
const teamController = require("../controller/teamController.js");

const router = express.Router();

router.get("/getAllTeams", teamController.getTeams);
router.get("/getTopPlayers", teamController.topStats);
router.delete("/deleteTeamById/:id", teamController.deleteTeam);
router.post("/addTeam", teamController.addTeam);
router.get("/getPlayerById/:id", teamController.playerDetails);

module.exports = router;