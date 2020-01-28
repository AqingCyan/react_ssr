import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { getHomeList } from './store/actions'

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
    return list.map(({ id, title }) => <p key={id}>· {title}</p>)
  }

  render() {
    return (
      <div>
        <Header />
        {this.getList()}
        <button type="button" onClick={() => alert('click this')}>Click me!</button>
      </div>
    )
  }
}

// 负责在服务器端渲染之前，将该路由需要的数据提前加载好
Home.loadData = (store) => store.dispatch(getHomeList())

const mapStateToProps = (state) => ({
  list: state.home.newsList,
})

const mapDispatchToProps = (dispatch) => ({
  gethomelist() {
    dispatch(getHomeList())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
