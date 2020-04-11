const calculateTotalSalary = (lineup) => {
  return lineup.reduce((totalSalary, player) => {
    return totalSalary += player.salary
  }, 0)
}

const meetsSalaryReqs = (lineup) => {
  return calculateTotalSalary(lineup) <= 45000
}


function getTeamCounts(lineup) {
  return lineup.reduce((teams, player) => {
    teams[player.teamId] = teams[player.teamId] === undefined ? 1 : teams[player.teamId] + 1

    return teams
  }, {})
}

function violatesTeamCount(teams) {
  return Object.values(teams).some((count) => { return count > 2 })
}

function getGameCounts(lineup) {
  return lineup.reduce((games, player) => {
    games[player.gameId] = games[player.gameId] === undefined ? 1 : games[player.gameId] + 1

    return games
  }, {})
}

function violatesGameCount(games) {
  return Object.values(games).some((count) => { return count > 3 })
}

const positionReqs = (lineup) => {
  let counter_OF = 0
  let counter_P = 0
  let counter_C = 0
  let counter_1B = 0
  let counter_2B = 0
  let counter_3B = 0
  let counter_SS = 0

  for (let i = 0; i < lineup.length; i++) {
    switch (lineup[i].position) {
      case 'P':
        counter_P++
        break
      case 'C':
        counter_C++
        break
      case '1B':
        counter_1B++
        break
      case '2B':
        counter_2B++
        break
      case '3B':
        counter_3B++
        break
      case 'SS':
        counter_SS++
        break
      case 'OF':
        counter_OF++
        break
      default:
        break
    }
  }

  return counter_P === 1 && counter_C === 1 && counter_1B === 1 &&
    counter_2B === 1 && counter_3B === 1 && counter_SS === 1 && counter_OF === 3
}



const validateLineup = (lineup) => {
  const teamCounts = getTeamCounts(lineup)
  const gameCounts = getGameCounts(lineup)

  return meetsSalaryReqs(lineup) &&
    !violatesTeamCount(teamCounts) &&
    !violatesGameCount(gameCounts) &&
    positionReqs(lineup)
}

module.exports = {
  validateLineup
}
