import axios from 'axios'

const getListOfPlayers = async (SetPlayers) => {
  const peopleResponse = await axios.get('https://swapi.co/api/people/?format=json')
  const playersNum = peopleResponse.data.count
  const vehicleResponse = await axios.get('https://swapi.co/api/vehicles/?format=json')
  const vehiclesNum = vehicleResponse.data.count

  return setPlayers(playersNum, vehiclesNum, SetPlayers)
}
const getListOfPlayersSlow = async (SetPlayers) => {
  const baseUrl = 'https://swapi.co/api/people/?format=json&page='
  let data = []
  const peopleResponse = await axios.get('https://swapi.co/api/people/?format=json')
  const playersPages = peopleResponse.data.count / 10
  for (let i = 1; i < playersPages + 1; i++) {
    const response = await axios.get(baseUrl + i)
    data = [...data, ...response.data.results]
  }
  const Players = data.filter(player => player.vehicles.length)
  console.log(Players)
}

const setPlayers = async (playerCount, vehicleCount, SetPlayers) => {
  const player1 = Math.floor(Math.random() * playerCount + 1)
  let player2 = Math.floor(Math.random() * playerCount + 1)
  if (player2 === player1) {
    ++player2
  }
  const players = {
    player1: await axios.get(`https://swapi.co/api/people/${player1}/?format=json`),
    player2: await axios.get(`https://swapi.co/api/people/${player2}/?format=json`)
  }
  return setVehicles(players, vehicleCount, SetPlayers)
}
const setVehicles = async (players, vehicleCount, SetPlayers) => {
  const Vehicles = {}
  if (players.player1.status === 200 && players.player1.data.vehicles.length) {
    const vehicles = players.player1.data.vehicles.length
    const randomVehicle = Math.floor(Math.random() * vehicles)
    Vehicles.player1 = await axios.get(players.player1.data.vehicles[randomVehicle])
  } else {
    Vehicles.player1 = await axios.get(`https://swapi.co/api/vehicles/14/?format=json`)
  }
  if (players.player2.status === 200 && players.player2.data.vehicles.length) {
    const vehicles = players.player2.data.vehicles.length
    const randomVehicle = Math.floor(Math.random() * vehicles)
    Vehicles.player2 = await axios.get(players.player2.data.vehicles[randomVehicle])
  } else {
        Vehicles.player2 = await axios.get(`https://swapi.co/api/vehicles/14/?format=json`)
  }
  return SetPlayersInfo(players, Vehicles, SetPlayers)
}

const SetPlayersInfo = (players, vehicles, SetPlayers) => {
  const Players = {}
  Players.player1 = {
    name: players.player1.data.name,
    vehicle: {
      name: vehicles.player1.data.name,
      cargo: vehicles.player1.data.cargo_capacity,
      speed: vehicles.player1.data.max_atmosphering_speed
    }
  }
  Players.player2 = {
    name: players.player2.data.name,
    vehicle: {
      name: vehicles.player2.data.name,
      cargo: vehicles.player2.data.cargo_capacity,
      speed: vehicles.player2.data.max_atmosphering_speed
    }
  }
  SetPlayers(Players)
}

export {getListOfPlayers, getListOfPlayersSlow}
