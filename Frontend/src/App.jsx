import React from 'react'
import { Route, Router } from 'react-router'
import signup from './pages/signup'
import signin from './pages/signin'

const App = () => {
  return (
    <Router>
      <Route />
      <Route path="/signup" component= {signup} />
      <Route path='/signin' component={ signin} />
    </Router>
  )
}

export default App