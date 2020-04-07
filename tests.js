const expect = require('chai').expect
const { describe, it } = require('mocha')
const {
  validateLineup, sortIntoTeams, meetsTeamSizeReqs, meetsSalaryReqs, meetsPositionCountReqs
} = require('./index')


describe('meetsPositionCountReqs', () => {
  it('passes with 3 outfielders', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'OF', teamId: 12, gameId: 123, salary: 900
      },
      {
        id: 2, name: 'Yadier Molina', position: 'OF', teamId: 12, gameId: 115, salary: 200
      },
      {
        id: 3, name: 'Luke Voit', position: 'OF', teamId: 12, gameId: 115, salary: 800
      },
    ]
    const result = meetsPositionCountReqs(lineup)

    expect(result).to.equal(true)
  })

  it('fails with 4 outfielders', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'OF', teamId: 12, gameId: 123, salary: 900
      },
      {
        id: 2, name: 'Yadier Molina', position: 'OF', teamId: 12, gameId: 115, salary: 200
      },
      {
        id: 3, name: 'Luke Voit', position: 'OF', teamId: 12, gameId: 115, salary: 800
      },
      {
        id: 4, name: 'Joe Voit', position: 'OF', teamId: 12, gameId: 115, salary: 800
      },
    ]
    const result = meetsPositionCountReqs(lineup)

    expect(result).to.equal(false)
  })

  it('fails with 2 catchers', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'OF', teamId: 12, gameId: 123, salary: 900
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 12, gameId: 115, salary: 200
      },
      {
        id: 3, name: 'Luke Voit', position: 'C', teamId: 12, gameId: 115, salary: 800
      },
      {
        id: 4, name: 'Joe Voit', position: 'P', teamId: 12, gameId: 115, salary: 800
      },
    ]
    const result = meetsPositionCountReqs(lineup)

    expect(result).to.equal(false)
  })
})


describe('meetsSalaryReqs', () => {
  it('passes with cheap players', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 900
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 12, gameId: 115, salary: 200
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 12, gameId: 115, salary: 800
      },
    ]
    const result = meetsSalaryReqs(lineup)

    expect(result).to.equal(true)
  })


  it('fails on expensive players', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 922500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 12, gameId: 115, salary: 2121500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 12, gameId: 115, salary: 2822100
      },
    ]
    const result = meetsSalaryReqs(lineup)

    expect(result).to.equal(false)
  })
})

describe('meetsTeamSizeReqs', () => {
  it('passes with a single person', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
    ]
    const result = meetsTeamSizeReqs(lineup)

    expect(result).to.equal(true)
  })


  it('fails on a triplicate', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 12, gameId: 115, salary: 2500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 12, gameId: 115, salary: 2800
      },
    ]
    const result = meetsTeamSizeReqs(lineup)

    expect(result).to.equal(false)
  })
})

describe('sortIntoTeams', () => {
  it.skip('should put distinct players into teams', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 123, salary: 2500
      },
    ]

    const teams = sortIntoTeams(lineup)

    expect(teams.length).to.equal(2)
    expect(teams[0].players.length).to.equal(1)
    expect(teams[1].players.length).to.equal(1)
  })

  it.skip('should deal with non-unique teams', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 12, gameId: 123, salary: 2500
      },
    ]

    const teams = sortIntoTeams(lineup)

    expect(teams.length).to.equal(1)
    expect(teams[0].players.length).to.equal(2)
  })
})

describe('validateLineup', () => {
  it.skip('returns true when the lineup satisfies all conditions', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800
      },
      {
        id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600
      },
    ]

    expect(validateLineup(lineup)).to.equal(true)
  })

  it.skip('returns false when the lineup includes too many players from a single team', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500
      },
      {
        id: 3, name: 'Mitch Morelane', position: '1B', teamId: 12, gameId: 123, salary: 2800
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800
      },
      {
        id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600
      },
    ]

    expect(validateLineup(lineup)).to.equal(false)
  })

  it.skip('returns false when the lineup includes too many players from a single game', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 123, salary: 2500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 123, salary: 3800
      },
      {
        id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600
      },
    ]

    expect(validateLineup(lineup)).to.equal(false)
  })

  it.skip('returns false when the lineup includes too many players from a single position', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800
      },
      {
        id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600
      },
      {
        id: 10, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 2200
      },
    ]

    expect(validateLineup(lineup)).to.equal(false)
  })

  it.skip('returns false when the lineup includes too few players from a single position', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 2500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800
      },
    ]

    expect(validateLineup(lineup)).to.equal(false)
  })

  it.skip('returns false when the lineup does not include a player from a position', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 9500
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 2800
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 3200
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 3100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 3300
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 3800
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 3800
      },
      {
        id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 3600
      },
    ]

    expect(validateLineup(lineup)).to.equal(false)
  })

  it.skip('returns false when the lineup has a total salary greater than 45000', () => {
    const lineup = [
      {
        id: 1, name: 'Chris Sale', position: 'P', teamId: 12, gameId: 123, salary: 10800
      },
      {
        id: 2, name: 'Yadier Molina', position: 'C', teamId: 22, gameId: 115, salary: 4000
      },
      {
        id: 3, name: 'Luke Voit', position: '1B', teamId: 20, gameId: 115, salary: 4400
      },
      {
        id: 4, name: 'Dee Gordon', position: '2B', teamId: 18, gameId: 101, salary: 4500
      },
      {
        id: 5, name: 'Manny Machado', position: '3B', teamId: 14, gameId: 134, salary: 4100
      },
      {
        id: 6, name: 'Troy Tulowitzki', position: 'SS', teamId: 27, gameId: 126, salary: 4500
      },
      {
        id: 7, name: 'Andrew McCutchen', position: 'OF', teamId: 11, gameId: 131, salary: 4200
      },
      {
        id: 8, name: 'Bryce Harper', position: 'OF', teamId: 15, gameId: 119, salary: 4400
      },
      {
        id: 9, name: 'Mookie Betts', position: 'OF', teamId: 12, gameId: 123, salary: 4200
      },
    ]

    expect(validateLineup(lineup)).to.equal(false)
  })
})
