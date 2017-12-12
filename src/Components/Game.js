import React, {Component} from 'react'

import {getListOfPlayers} from '../Services'
import './Game.css'

import Player from './Players'
import Match from './Match'

class Game extends Component {
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
    getListOfPlayers(this.SetPlayers)
  }
  SetPlayers = players => {
    this.setState( prevState => {
      prevState.loaded = true
      prevState.players= {
        player1: players.player1,
        player2: players.player2
      }
      return prevState
    }

  )}
  componentDidMount () {
    getListOfPlayers(this.SetPlayers)
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
    getListOfPlayers(this.SetPlayers)
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

export default Game
