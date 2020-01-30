import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import getHomeList from './store/actions'

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
        style={{ fontSize: '20px', margin: '10px 5px', color: '#333' }}
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
          style={{
            margin: '10px 5px',
            width: '100px',
            height: '45px',
            border: 0,
            fontSize: '15px',
            borderRadius: '5px',
            backgroundColor: '#2d80f7',
            color: '#fff',
            outline: 'none',
          }}
        >
          Click me!
        </button>
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
