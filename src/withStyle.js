// 处理style文件的高阶组件
import React from 'react'

export default (DecoratedComponent, style) => class NewComponent extends React.Component {
  componentWillMount() {
    const { staticContext } = this.props
    if (staticContext) {
      staticContext.css.push(style._getCss())
    }
  }

  render() {
    return <DecoratedComponent {...this.props} />
  }
}
