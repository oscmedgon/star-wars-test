import React, {Component} from 'react'

class Match extends Component {
  constructor () {
    super()
  }
  render () {
    return (
      <div className='players'>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

export default Match
