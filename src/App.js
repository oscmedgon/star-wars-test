import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Components/Home'
import FastGame from './Components/MatchType/FastGame'
import CorrectGame from './Components/MatchType/CorrectGame'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/fast-game/' component={FastGame} />
    <Route path='/correct-game/' component={CorrectGame} />
  </Switch>
)

export default App
