import React from 'react'
import Header from '../../components/Header'

const Home = () => (
  <div>
    <Header />
    <h1>Hello React SSR</h1>
    <p>Let us learn SSR</p>
    <button type="button" onClick={() => alert('click this')}>Click me!</button>
  </div>
)

export default Home
