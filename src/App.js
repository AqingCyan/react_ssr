import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './components/Header'
import { actions } from './components/Header/store'

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

App.loadData = (store) => store.dispatch(actions.getHeaderInfo())

export default App
