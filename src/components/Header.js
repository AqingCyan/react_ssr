import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <div style={{ width: '100%', height: '50px', backgroundColor: 'pink' }}>
    <Link to="/">
      <h1 style={{ display: 'inline-block', color: 'white', marginRight: '20px' }}>Home</h1>
    </Link>
    <Link to="/login">
      <h1 style={{ display: 'inline-block', color: 'white' }}>Login</h1>
    </Link>
  </div>
)

export default Header
