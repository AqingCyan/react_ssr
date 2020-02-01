import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store'
import s from './style.css'

class Header extends PureComponent {
  componentWillMount() {
    const { staticContext } = this.props
    console.log(this.props)
    if (staticContext) {
      console.log(s._getCss())
      staticContext.css = s._getCss()
    }
  }

  render() {
    const { login, handleLogin, handleLogout } = this.props
    return (
      <div className={s.header}>
        <Link to="/">
          <h1>首页</h1>
        </Link>
        {
          login
            ? (
              <div style={{ display: 'inline-block' }}>
                <Link to="/translation">
                  <h1>翻译</h1>
                </Link>
                <div onClick={handleLogout} className={s.linkButton}>
                  <h1>注销</h1>
                </div>
              </div>
            ) : (
              <div onClick={handleLogin} className={s.linkButton}>
                <h1>登录</h1>
              </div>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.header.login,
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    dispatch(actions.logout())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
