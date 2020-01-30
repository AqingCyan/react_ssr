import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/Header'

const App = (props) => {
  const { route } = props
  return (
    <div>
      <Header />
      {
        renderRoutes(route.routes)
      }
    </div>
  )
}

export default App
