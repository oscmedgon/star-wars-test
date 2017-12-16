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
    this.handleReroll()
    this.setState( prevState => {
      prevState.status = false
      return prevState
    })
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
    this.setState( prevState => {
      prevState.loaded = true
      prevState.players= Players
      return prevState
    })
}
  componentDidMount () {
    getListOfPlayersSlow(this.SetParticipants)
  }
  handleReroll = () => {
    const Players = RandomPlayers(this.state.participants)
    this.SetPlayers(Players)
  }
  render () {
    return (
      <div className='game-zone'>
        <div className='game-section'>
          <Player playerName={this.state.players.player1.name} vehicle={this.state.players.player1.vehicle} player='Player 1'/>
        </div>
        <div className='game-section'>
          <Match players={this.state.players} status={this.state.status} loaded={this.state.loaded} title='VS' StartMatch={this.StartMatch} EndMatch={this.EndMatch} handleReroll={this.handleReroll} />
        </div>
        <div className='game-section'>
          <Player playerName={this.state.players.player2.name} vehicle={this.state.players.player2.vehicle} player='Player 2'/>
        </div>
      </div>
    )
  }
}

export default CorrectGame
