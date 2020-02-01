import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import getHomeList from './store/actions'
import s from './style.css'

class Home extends PureComponent {
  componentWillMount() {
    const { staticContext } = this.props
    if (staticContext) {
      staticContext.css = s._getCss()
    }
  }

  componentDidMount() {
    const { gethomelist } = this.props
    const { list } = this.props
    if (!list.length) {
      gethomelist()
    }
  }

  getList() {
    const { list } = this.props
    return list.map(({ id, title }, index) => (
      <p
        key={id}
        className={s.list}
      >
        {index + 1} {title}
      </p>
    ))
  }

  render() {
    return (
      <div>
        {this.getList()}
        <button
          type="button"
          onClick={() => alert('click this')}
          className={s.testButton}
        >
          Click me!
        </button>
      </div>
    )
  }
}

// 负责在服务器端渲染之前，将该路由需要的数据提前加载好
Home.loadData = (store) => (store.dispatch(getHomeList()))

const mapStateToProps = (state) => ({
  list: state.home.newsList,
})

const mapDispatchToProps = (dispatch) => ({
  gethomelist() {
    dispatch(getHomeList())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
