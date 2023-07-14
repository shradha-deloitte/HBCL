let data = require("../mock");

// Get all matches
exports.getAllMatches = (req, res) => {
  res.send(data.matches);
};

// Get match by ID
exports.getMatchById = (req, res) => {
  const id = parseInt(req.params.id);
  const match = data.matches.find((match) => match.id === id);

  if (match) {
    res.json({
      match,
    });
  } else {
    res.status(404).send("Match not found");
  }
};

// Create a match
exports.createMatch = (req, res) => {
  const { date, teams } = req.body;
  const newMatch = {
    id: data.matches.length + 1,
    date,
    teams,
  };

  data.matches.push(newMatch);
  res.status(201).send(newMatch);
};

// Update a match
exports.updateMatch = (req, res) => {
  const id = parseInt(req.params.id);
  const match = data.matches.find((match) => match.id === id);

  if (match) {
    match.date = req.body.date;
    match.teams = req.body.teams;

    res.json(match);
  } else {
    res.status(404).send("Match not found");
  }
};

// Delete a match
exports.deleteMatch = (req, res) => {
  const id = parseInt(req.params.id);
  const matchIndex = data.matches.findIndex((match) => match.id === id);

  if (matchIndex !== -1) {
    const deletedMatch = data.matches.splice(matchIndex, 1);
    res.json({
      deletedMatch,
    });
  } else {
    res.status(404).send("Match not found");
  }
};

// Get match by date
exports.getMatchByDate = (req, res) => {
  const date = req.params.date;
  const matches = data.matches.filter((match) => match.date === date);

  res.json(matches);
};
