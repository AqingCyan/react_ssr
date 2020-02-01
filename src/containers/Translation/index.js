import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import getTranslationList from './store/actions'

class Translation extends PureComponent {
  componentDidMount() {
    const { list, gettranslationlist } = this.props
    if (!list.length) {
      gettranslationlist()
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
    const { login } = this.props
    return login ? (<div>{this.getList()}</div>) : <Redirect to="/" />
  }
}

const mapStateToProps = (state) => ({
  list: state.translation.translationList,
  login: state.header.login,
})

const mapDispatchToProps = (dispatch) => ({
  gettranslationlist() {
    dispatch(getTranslationList())
  },
})

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(Translation)

ExportTranslation.loadData = (store) => (store.dispatch(getTranslationList()))

export default ExportTranslation
