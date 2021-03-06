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
        <h3>
          Game specifications
        </h3>
        <ul className='information'>
          <li>
            This game type loads just a few data, in a slow network it's recomended.
          </li>
          <li>
            In a slow network 3G this may load in 28 seconds.
          </li>
          <li>
            This game mode may have some errors because the used API it's not good.
          </li>
        </ul>
      </Link>
    </div>
    <div>
      <Link to='/correct-game'>
        <img src={correctGame} alt='correct-game' width='200' />
        <h2>Full Load Game</h2>
        <h3>
          Game specifications
        </h3>
        <ul className='information'>
          <li>
            This game type loads all information before you can play.
          </li>
          <li>
            In a slow network 3G this may load in 40 seconds.
          </li>
          <li>
            This game mode filters all API information to make the game error free.
          </li>
        </ul>
      </Link>
    </div>
  </div>
)

export default Home
