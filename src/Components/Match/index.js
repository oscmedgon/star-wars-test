import React, {Component} from 'react'

import './Match.css'
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
      }
      if (this.state.stats.player2.winner){
        ++prevState.history.player2.victory
      }
      return prevState
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
        <h2>{this.props.title}</h2>
        <h1 className='clasification'>{this.state.history.player1.victory} : {this.state.history.player2.victory}</h1>
        <ul className='rules'>
          <li>
            <img src='/images/gold.png' alt='gold' height='60' />
            <p>{this.state.rules.gold} Kg</p>
          </li>
          <li>
            <img src='/images/distance.png' alt='distance' height='60' />
            <p>{this.state.rules.distance} Km</p>
          </li>
        </ul>
          {this.state.stats ? (
            <div>
              <h2>
              Last Match Stats
              </h2>
              <div className='match-stats'>
                <div>
                  <ul>
                    <li>
                      Total Travels: <strong>{this.state.stats.player1.travels}</strong>
                    </li>
                    <li>
                      Time per Travel: <strong>{this.state.stats.player1.time} Hours</strong>
                    </li>
                    <li>
                      Total Time: <strong>{this.state.stats.player1.totalTime} Hours</strong>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      Total Travels: <strong>{this.state.stats.player2.travels}</strong>
                    </li>
                    <li>
                      Time per Travel: <strong>{this.state.stats.player2.time} Hours</strong>
                    </li>
                    <li>
                      Total Time: <strong>{this.state.stats.player2.totalTime} Hours</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            ) :
            <div></div>
          }
        {this.props.status || !this.props.loaded ?
            (<img src='https://thumbs.gfycat.com/AmazingDazzlingFrog-max-1mb.gif' alt='loading' height='100' />) :
            (
              <div>
                <button className='btn btn-start' type='button' onClick={this.handleStart}>START</button>
                <button className='btn btn-reset' type='button' onClick={this.props.handleReroll}>Change players</button>
              </div>
            )
        }

      </div>
    )
  }
}

export default Match
