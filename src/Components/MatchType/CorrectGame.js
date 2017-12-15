import React, {Component} from 'react'

import {getListOfPlayersSlow} from '../../Services'
import {RandomPlayers} from '../../Utils'
import './Game.css'

import Player from '../Players'
import Match from '../Match'

class CorrectGame extends Component {
  constructor () {
    super()
    this.state = {
      lastVictory: null,
      loaded: false,
      status: false,
      players:{
        player1: {
          name: 'Loading...',
          vehicle: {
            name: 'Loading...',
            cargo: 'Loading...',
            speed: 'Loading...'
          }
        },
        player2: {
          name: 'Loading...',
          vehicle: {
            name: 'Loading...',
            cargo: 'Loading...',
            speed: 'Loading...'
          }
        }
      }
    }
  }
  StartMatch = () => {
    this.setState( prevState => {
      prevState.status = true
      return prevState
    })
  }
  EndMatch = (stats) => {
    this.setState(prevState => {
      prevState.status = false
      prevState.loaded = false
      prevState.players = {
        player1: {
          name: 'Loading...',
          vehicle: {
            name: 'Loading...',
            cargo: 'Loading...',
            speed: 'Loading...'
          }
        },
        player2: {
          name: 'Loading...',
          vehicle: {
            name: 'Loading...',
            cargo: 'Loading...',
            speed: 'Loading...'
          }
        }
      }
      return prevState
    })
    getListOfPlayersSlow(this.SetPlayers)
  }
  SetParticipants = (players) => {
    this.setState( prevState => {
      prevState.participants = players
      return prevState
    })

    const Players = RandomPlayers(players)
    this.SetPlayers(Players)
  }
  SetPlayers = Players => {
    const {player1 , player2} = Players
    console.log(player1)
    debugger
    console.log(player1.vehicles)
    this.setState( prevState => {
      prevState.loaded = true
      prevState.players= {
        player1: {
          name: player1.name,
          vehicle: {
            name: player1.vehicles[0].name,
            cargo: player1.vehicles[0].cargo_capacity,
            speed: player1.vehicles[0].max_atmosphering_speed
          }
        },
        player2: {
          name: player2.name,
          vehicle: {
            name: player2.vehicles[0].name,
            cargo: player2.vehicles[0].cargo_capacity,
            speed: player2.vehicles[0].max_atmosphering_speed
          }
        }
      }
      console.log(prevState)
      return prevState
    }

  )}
  componentDidMount () {
    getListOfPlayersSlow(this.SetParticipants)
  }
  handleReroll = () => {
    this.setState(prevState => {
      prevState.status = false
      prevState.loaded = false
      prevState.players = {
        player1: {
          name: 'Loading...',
          vehicle: {
            name: 'Loading...',
            cargo: 'Loading...',
            speed: 'Loading...'
          }
        },
        player2: {
          name: 'Loading...',
          vehicle: {
            name: 'Loading...',
            cargo: 'Loading...',
            speed: 'Loading...'
          }
        }
      }
      return prevState
    })
    getListOfPlayersSlow(this.SetParticipants)
  }
  render () {
    return (
      <div className='game-zone'>
        <div className='game-section'>
          <Player data={this.state.players.player1} player='Player 1'/>
        </div>
        <div className='game-section'>
          <Match players={this.state.players} status={this.state.status} loaded={this.state.loaded} title='VS' StartMatch={this.StartMatch} EndMatch={this.EndMatch} handleReroll={this.handleReroll} />
        </div>
        <div className='game-section'>
          <Player data={this.state.players.player2} player='Player 2'/>
        </div>
      </div>
    )
  }
}

export default CorrectGame
