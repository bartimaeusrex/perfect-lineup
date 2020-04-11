const calculateTotalSalary = (lineup) => {
  return lineup.reduce((totalSalary, player) => {
    return totalSalary += player.salary
  })

  // let totalSalary = 0

  // for (let i = 0; i < players.length; i++) {
  //   totalSalary += players[i].salary
  // }

  // return totalSalary <= 45000 <<<------ Due to the nature of "reduce": HANDLED BELOW
}

const meetsSalaryReqs = (lineup) => {
  return calculateTotalSalary(lineup) > 45000
}

const isValidNumberOfTeams = (lineup) => {
// 2) Lineups may not contain more than 2 players from a single team
// filter teamIds such that it fails when there are > 2 of the same teamId
// ...
  const isSameTeam = lineup.teamId[i] === lineup.teamId[i + 1]

  return lineup.filter(teamId[i])
  
  }
  
  // return lineup.filter(team => player.team[i] === player.team[i + 1])
}







const isValidNumberOfGames = (lineup) => {
  // 3) Lineups may not contain more than 3 players from a single game
}// filter gameIds such that it fails when there are > 2 of the same gameId






const positionReqs = (lineup) => {
  // 'OF', 'OF', 'OF', 'P', 'C', '1B', '2B', '3B', 'SS'
  return 0
}





const validateLineup = (lineup) => meetsSalaryReqs(lineup)
  && isValidNumberOfTeams
  && isValidNumberOfGames
  && positionReqs

module.exports = {
  validateLineup
}
