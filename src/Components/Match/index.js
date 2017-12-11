import React, {Component} from 'react'

import {setRules, checkPlayers} from '../../Utils'

class Match extends Component {
  constructor () {
    super()
    this.state = {
      history: {
        player1: {
          victory: 0
        },
        player2: {
          victory: 0
        }
      },
      rules: {
        gold: 'Loading...',
        distance: 'Loading...'
      }
    }
  }
  componentDidMount () {
    console.log()
    const rules = setRules()
    this.setState({
      players: this.props.players,
      history: {
        player1: {
          victory: 0
        },
        player2: {
          victory: 0
        }
      },
      rules: rules
    })
  }
  componentWillReceiveProps (props) {
    this.setState(prevState => {
      prevState.players = props.players
      return prevState
    })
  }
  handleStart = async () => {
    this.props.StartMatch()
    this.checkMatch()
  }
  matchFinished() {
    this.setState(prevState => {
      if (this.state.stats.player1.winner){
        ++prevState.history.player1.victory
        return prevState
      }
      if (this.state.stats.player2.winner){
        ++prevState.history.player2.victory
        return prevState
      }
    })
    this.props.EndMatch()
  }
  checkMatch = () => {
    this.setState(prevState => {
      prevState.stats = checkPlayers(this.state.players, this.state.rules)
      return prevState
    })
    this.matchFinished()
  }
  render () {
    return (
      <div className='players'>
        <h1>{this.props.title}</h1>
        <h2>{this.state.history.player1.victory} : {this.state.history.player2.victory}</h2>
        <ul>
          <li>
            <img src='/images/gold.png' alt='gold' height='60' />
            {this.state.rules.gold} Kg
          </li>
          <li>
            <img src='/images/distance.png' alt='distance' height='60' />
            {this.state.rules.distance} Km
          </li>
        </ul>
        {this.props.status || !this.props.loaded ? <img src='https://thumbs.gfycat.com/AmazingDazzlingFrog-max-1mb.gif' alt='loading' height='100' /> : <button type='button' onClick={this.handleStart}>START</button>}
      </div>
    )
  }
}

export default Match
