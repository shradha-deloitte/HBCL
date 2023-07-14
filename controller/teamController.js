const data = require("../mock.js");

// Get all teams
exports.getTeams = (req, res) => {
  res.send(data.teams);
};

// Get player details
exports.playerDetails = (req, res) => {
  const playerId = parseInt(req.params.id);
  let playerFound = false;

  for (const team of data.teams) {
    const player = team.players.find((player) => player.id === playerId);
    if (player) {
      playerFound = true;
      res.json(player);
      break;
    }
  }

  if (!playerFound) {
    res.status(404).json({ error: "Player not found" });
  }
};

// Get top scorers and wicket keepers in a team.
exports.topStats = (req, res) => {
  const topPlayers = [];

  data.teams.forEach((team) => {
    const teamPlayers = team.players;

    if (teamPlayers.length === 0) {
      topPlayers.push({ team: team.name, players: [] });
      return;
    }

    const maxScore = Math.max(...teamPlayers.map((player) => player.score));
    const maxWickets = Math.max(...teamPlayers.map((player) => player.wickets));

    const topScorers = teamPlayers.filter(
      (player) => player.score === maxScore
    );
    const topWicketTakers = teamPlayers.filter(
      (player) => player.wickets === maxWickets
    );

    topPlayers.push({ team: team.name, topScorers, topWicketTakers });
  });

  res.json(topPlayers);
};

// Create a team
exports.addTeam = (req, res) => {
  const { name, players } = req.body;
  const teamId = data.teams.length + 1;
  const newTeam = { id: teamId, name, players };
  data.teams.push(newTeam);
  res.json(newTeam);
};

// Delete a team
exports.deleteTeam = (req, res) => {
  const teamId = parseInt(req.params.id);
  const foundIndex = data.teams.findIndex((team) => team.id === teamId);

  if (foundIndex !== -1) {
    const deletedTeam = data.teams.splice(foundIndex, 1);
    res.json({ deletedTeam });
  } else {
    res.status(404).json({ error: "Team not found" });
  }
};
