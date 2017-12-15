function setRules () {
  const distance = Math.floor(Math.random() * 99000 + 1000)
  const gold = Math.floor(Math.random() * 9900 + 100)
  const rules = {distance, gold}
  return rules
}
function checkPlayerTravels (goal, cargo) {
  return Math.floor(goal / parseInt(cargo, 10)) + 1
}
function checkTimeTravels (goal, speed) {
  return Math.round(goal / parseInt(speed, 10))
}
function checkTotalTime (TravelTime, TravelNum) {
  let TotalTime = 0
  // Each ship travels 2 times per travel but the last travel just one
  TotalTime = (TravelNum * TravelTime) * 2 - TravelTime
  // Every trave has 2 hous extra, 1 to load gold and 1 to unload gold
  TotalTime = TotalTime + (TravelNum * 2)
  return TotalTime
}
function checkWinner (totalP1, totalP2) {
  if (totalP1 > totalP2) {
    return 2
  } else if (totalP1 === totalP2) {
    return 'x'
  } else {
    return 1
  }
}
function checkPlayers (players, rules) {
  const {player1, player2} = players
  const travelsP1 = checkPlayerTravels(rules.gold, player1.vehicle.cargo)
  const travelsP2 = checkPlayerTravels(rules.gold, player2.vehicle.cargo)
  const timePerTravelP1 = checkTimeTravels(rules.distance, player1.vehicle.speed)
  const timePerTravelP2 = checkTimeTravels(rules.distance, player2.vehicle.speed)
  const TotalTimeP1 = checkTotalTime(timePerTravelP1, travelsP1)
  const TotalTimeP2 = checkTotalTime(timePerTravelP2, travelsP2)
  const winner = checkWinner(TotalTimeP1, TotalTimeP2)
  console.log(winner)
  const stats = {
    player1: {
      travels: travelsP1,
      time: timePerTravelP1,
      totalTime: TotalTimeP1,
      winner: (winner !== 2)
    },
    player2: {
      travels: travelsP2,
      time: timePerTravelP2,
      totalTime: TotalTimeP2,
      winner: (winner !== 1)
    }
  }
  return stats
}
function RandomPlayers (players, SetPlayers) {
  const Players = []
  for (let i = 1; i < 3; i++) {
    Players.push({[`player${i}`]: players[Math.floor(Math.random() * players.length)]})
  }
  console.log(Players)
  SetPlayers(Players)
}

export {setRules, checkPlayers, RandomPlayers}
