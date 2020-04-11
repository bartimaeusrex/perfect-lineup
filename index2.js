//
// REFERENCE:
//
// The 9 required positions: 'OF', 'OF', 'OF', 'P', 'C', '1B', '2B', '3B', 'SS'
// In a lineup, <= 2 players from the same team
// ...    and   <= 3 players from the same game
// Total team salary <= 45000
//
//

const meetsSalaryReqs = (players) => {
  let totalSalary = 0

  for (let i = 0; i < players.length; i++) {
    totalSalary += players[i].salary
  }

  return totalSalary <= 45000
}

class Team {
  constructor(id, game) {
    this.id = id
    this.players = []
    this.game = game
  }
  get playerCount() {
    return this.players.length
  }
  get gameId() {
    return this.game
  }
}

const sortIntoTeams = players => {
  // Associate teamId to team object
  const teams = {}

  for (const player of players) {
    if (!teams[player.teamId]) {
      teams[player.teamId] = new Team(player.teamId)
    }
    teams[player.teamId].players.push(player)
  }

  // Get plain array of teams
  return Object.values(teams)
}

const meetsTeamSizeReqs = players => {
  const teams = sortIntoTeams(players)

  const failures = teams.filter(team => team.playerCount > 2)

  return failures.length === 0
}

// const positions = {
//   'P': 1,
//   'C': 1,
//   '1B': 1,
//   '2B': 1,
//   '3B': 1,
//   'SS': 1,
//   'OF': 3,
// }


const meetsPlayersPerGameReqs = players => {

}

const sortByPosition = players => {
  const positions = {}

  for (const player of players) {
    // Create slot if necessary
    if (!positions[player.position]) {
      positions[player.position] = []
    }
    // Add to slot
    positions[player.position].push(player)
  }

  return positions
}


const meetsPositionCountReqs = players => {
  // Sort players by position
  // 
  return false
}



const meetGameCountReqs = players => {
  return false
}


const validateLineup = (lineup) => meetsSalaryReqs(lineup) &&
    meetsTeamSizeReqs(lineup) &&
    meetsPositionCountReqs(lineup) &&
    meetGameCountReqs(lineup) &&
    checkPositions(lineup)


module.exports = {
  validateLineup
}
