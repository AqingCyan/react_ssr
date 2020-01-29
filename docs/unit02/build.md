# 构建工程

React SSR 是一个前后端一起构建的项目，因此，我们从最基础的工程构建开始做起

## 工程目录设计

首先我们整理一下刚刚的示例代码目录，换一个好听的一点的名字，然后创建一个 `src` 目录，在其下层创建 `index.js` 文件。

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('Hello World'))

app.listen(10086, () => console.log('Example app listening on port 10086!'))
```

删除掉刚刚的 `app.js` 文件，然后再在 `src` 目录下创建一个名为 `containers` 目录，用来存放客户端和服务端共用的 React 组件。在其下创建一个 `App`组件，
在它的 `index.js` 中写入：

```jsx harmony
const React = require('react')

const App = () => <h1>Hello React SSR</h1>

module.exports = {
  default: App
}
```

当然，别忘了安装必要的依赖：

```shell script
npm install react react-dom --save
```

我们再引入写好的组件到 `index.js` 中：

```js
const express = require('express')
const App = require('./containers/App')

const app = express()

app.get('/', (req, res) => res.send(`<h1>Hello World</h1>`))

app.listen(10086, () => console.log('Example app listening on port 10086!'))

```

## webpack 配置

如果此时运行代码，必然会报错,首先，我们引入 React 组件，node 是认不得的。其次，我们使用 `require` 的方式也显得不是很舒服。因此，webpack 显身手：

根目录下创建一个 `webpack.server.js` 文件，因为对于客户端的代码我们后面还需要另外去做配置。

webpack 的配置大同小异，我们需要使用 babel 帮我们转化编译代码：

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      options: {
        presets: ['react', 'stage-0', ['env', {
          targets: {
            browsers: ['last 3 version'],
          },
        }]],
      },
    }],
  },
}
```

- 入口文件是 `src/index.js`，也就是我们创建的服务器 `app`。
- `target: 'node'` 指定了环境是 node 的。
- [nodeExternals](https://www.npmjs.com/package/webpack-node-externals) 这个库为所有node_modules名称扫描node_modules文件夹，并且构建扩展函数，告诉webpack不要捆绑这些模块或它们的任何子模块。
- `browsers: ['last 3 version']` 兼容了所有主流浏览器往前 3 个版本。
- 还有 `options` 中做了对 React 和 ES6的编译。

当然，记得装相关的依赖：

```json
{
  "express": "^4.17.1",
  "react": "^16.12.0",
  "babel-core": "^6.26.3",
  "babel-loader": "^7.1.5",
  "babel-preset-env": "^1.7.0",
  "babel-preset-react": "^6.24.1",
  "babel-preset-stage-0": "^6.24.1",
  "webpack": "^4.41.5",
  "webpack-cli": "^3.3.10",
  "webpack-node-externals": "^1.7.2"
}
```

在 `package.json` 的 scripts 中增加一条：`"build":"webpack --config ./webpack.server.js"`，之后运行该条命令，看看有无打包成功。

最后记得 `node build/bundle.js`，查看是否运行成功，并且在页面输出，`Hello World`。

## 新的问题

这个时候，我们虽然解决了打包构建项目的问题，但是，如果我们直接让 `res.send(<App />)` 的话，会告知我们需要引入 React，因为渲染 JSX 语法必须依赖 React。
但引入后，再次打包运行，访问页面，得到的也只是一个 JSON 对象，控制台告知我们：

```text
Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: object.
```

这说明服务端并没有运行 React 代码，而是单纯的将内容返回。如何将 React 组件在服务端运行好生成页面后再返回到客户端，是我们下一步需要解决的问题。
