import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = (props) => {
  const { login } = props
  return (
    <div style={{ width: '100%', height: '50px', backgroundColor: 'orange' }}>
      <Link to="/">
        <h1 style={{ display: 'inline-block', color: 'white', marginRight: '20px' }}>首页</h1>
      </Link>
      {
        login
          ? (
            <div>
              <Link to="/login">
                <h1 style={{ display: 'inline-block', color: 'white', marginRight: '20px' }}>翻译</h1>
              </Link>
              <Link to="/login">
                <h1 style={{ display: 'inline-block', color: 'white', marginRight: '20px' }}>注销</h1>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <h1 style={{ display: 'inline-block', color: 'white', marginRight: '20px' }}>登录</h1>
            </Link>
          )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  login: state.header.login,
})

export default connect(mapStateToProps, null)(Header)
