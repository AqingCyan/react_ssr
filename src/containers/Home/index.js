import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import getHomeList from './store/actions'
import withStyle from '../../withStyle'
import s from './style.css'

class Home extends PureComponent {
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

const mapStateToProps = (state) => ({
  list: state.home.newsList,
})

const mapDispatchToProps = (dispatch) => ({
  gethomelist() {
    dispatch(getHomeList())
  },
})

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, s))

// 负责在服务器端渲染之前，将该路由需要的数据提前加载好
ExportHome.loadData = (store) => (store.dispatch(getHomeList()))

export default ExportHome
