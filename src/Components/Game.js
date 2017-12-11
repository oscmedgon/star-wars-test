import React, {Component} from 'react'

import {getListOfPlayers} from '../Services'
import './Game.css'

import Player from './Players'
import Match from './Match'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      status: false,
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
  SetPlayers = players => {
    this.setState( prevstate => {
      prevstate.player1= players.player1
      prevstate.player2= players.player2
      return prevstate
    }

  )}
  componentDidMount () {
    getListOfPlayers(this.SetPlayers)
  }
  render () {
    return (
      <div className='game-zone'>
        <div className='game-section'>
          <Player data={this.state.player1} player='Player 1'/>
        </div>
        <div className='game-section'>
          <Match status={this.state.status} title='Match rules' />
        </div>
        <div className='game-section'>
          <Player data={this.state.player2} player='Player 2'/>
        </div>
      </div>
    )
  }
}

export default Game
