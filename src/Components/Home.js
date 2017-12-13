import React from 'react'
import {Link} from 'react-router-dom'

import './Home.css'

const fastImg = 'http://123emoji.com/wp-content/uploads/2016/04/Star-Wars-Yoda-Collection-Stickers-639882.png'
const correctGame = 'https://stickershop.line-scdn.net/stickershop/v1/product/2005/LINEStorePC/main@2x.png;compress=true'

const Home = () => (
  <div className='main-menu'>
    <div>
      <Link to='/fast-game'>
        <img src={fastImg} alt='fast-game' width='200' />
        <h2>Fast Game</h2>
      </Link>
    </div>
    <div>
      <Link to='/correct-game'>
        <img src={correctGame} alt='correct-game' width='200' />
        <h2>Correct Game</h2>
      </Link>
    </div>
  </div>
)

export default Home
