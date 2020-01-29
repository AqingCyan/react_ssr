# React 在服务端的渲染

之前，我们解决了服务端构建打包的问题，但是还没有完成 React 在服务端的渲染，现在我们尝试一下。

## React 在服务端渲染

既然已经配置好了 webpack， 那我们可以直接使用 `import`：

```js
import express from 'express'
import React from 'react'
import App from './containers/App'

const app = express()

app.get('/', (req, res) => res.send(<App />))

app.listen(10086, () => console.log('Example app listening on port 10086!'))
```

```jsx harmony
import React from 'react'

const App = () => <h1>Hello React SSR</h1>

export default App
```

现在，我们可以思考，既然直接 `res.send(<App />)` 是不行的，React 组件并不会执行渲染。再回顾一开始的示例，我们返回的是一个用字符串拼接的页面。

因此，必须得有一个方法去处理 React 到字符串的转化，翻阅 React 的文档，在服务端渲染这里，我们可以看到三个方法：

- `renderToString()`：将 React 元素渲染为初始 HTML。React 将返回一个 HTML 字符串。你可以使用此方法在服务端生成 HTML，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 SEO 优化的目的。
- `renderToNodeStream()`：将一个 React 元素渲染成其初始 HTML。返回一个可输出 HTML 字符串的可读流。通过可读流输出的 HTML 完全等同于 ReactDOMServer.renderToString 返回的 HTML。你可以使用本方法在服务器上生成 HTML，并在初始请求时将标记下发，以加快页面加载速度，并允许搜索引擎抓取你的页面以达到 SEO 优化的目的。
- `ReactDOM.hydrate()`：与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器。

> 在前两个方法的末尾有一行备注：如果你在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 方法，React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。[更多](https://zh-hans.reactjs.org/docs/react-dom-server.html)

!> Stream Api 仅限于服务端使用，在浏览器中是不可用的。toString 可以在浏览器中使用。

那么我们就需要使用上面的方法来改造我们的代码：

```shell script
npm install react-dom --save
```

```js
import Express from 'express'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import App from './containers/App'

const { renderToString } = ReactDomServer
const app = Express()

// 把渲染内容以流的形式塞给response
// renderToNodeStream(<App />).pipe(res)
app.get('/', (req, res) => res.send(renderToString(<App />)))

app.listen(10086, () => console.log('Example app listening on port 10086!'))
```

此时，我们重新打包，再运行 `build/bundle.js` 就可以成功的将 React 呈现到页面上了。此时，我们已经完成了一个最基本的 React SSR ！

## 建立在虚拟DOM上的渲染

虚拟 DOM 是真实 DOM 的一个 JavaScript 对象的映射，因此，我们写的 `<App />` 组件本质上是一个 JavaScript 对象。因此，回到之前提到的：

> 在服务端中，不存在页面这个概念，更没有 DOM 可以去操作。

React 的虚拟 DOM，在平时的开发中，是通过 `ReactDom.render()` 来将虚拟 DOM 渲染为真实 DOM。

那与此同理，在服务端即使没有 DOM 可以操作的情况下，我们仍然能够操作虚拟 DOM 来实现对 DOM 的操作，并且，此时我们会使用 `renderToString()` 来将虚拟 DOM 转化为字符串拼接成的页面。

因此，虚拟 DOM 会带来两方面的优势：

- 提升了页面的渲染性能
- 使得服务器端渲染变得十分简单
