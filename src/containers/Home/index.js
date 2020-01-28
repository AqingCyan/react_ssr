import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { getHomeList } from './store/actions'

class Home extends PureComponent {
  componentDidMount() {
    const { gethomelist } = this.props
    gethomelist()
  }

  render() {
    const { name } = this.props
    return (
      <div>
        <Header />
        <h1>Hello {name}</h1>
        <p>Let us learn SSR</p>
        <button type="button" onClick={() => alert('click this')}>Click me!</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.home.name,
})

const mapDispatchToProps = (dispatch) => ({
  gethomelist() {
    dispatch(getHomeList())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
