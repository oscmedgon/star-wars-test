import React, {Component} from 'react'

import './Player.css'

class Player extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Loading...',
      vehicle: {
        name: 'Loading...',
        cargo: 'Loading...',
        speed: 'Loading...'
      }
    }
  }
  componentWillReceiveProps (props) {
    const {playerName, vehicle} = props
    this.setState({
      name: playerName,
      vehicle: {
        name: vehicle.name,
        cargo: vehicle.cargo,
        speed: vehicle.speed
      }
    })
  }
  render () {
    return (
      <div className='players'>
        <h1>{this.props.player}</h1>
        <h2>{this.state.name}</h2>
        <ul>
          <li>
            Vehicle: <span>{this.state.vehicle.name}</span>
          </li>
          <li>
            Cargo capacity: <span>{this.state.vehicle.cargo}</span>
          </li>
          <li>
            Speed: <span>{this.state.vehicle.speed}</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Player
