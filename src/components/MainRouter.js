import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Inicio from '@/pages/Inicio'

import { BASEPATH } from '@/globals'

export default function Main(props) {
  return (
    <div className="app">
      <Router basename={BASEPATH}>
        <Switch>
          <Route path="/" component={Inicio} />
        </Switch>
      </Router>
    </div>
  )
}
