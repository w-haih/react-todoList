1.  npx create-react-app  my_react
2. cd my_react
3. npm start

yarn 

安装router
yarn add react-router-dom

 解决 Error: Cannot find module ‘sass‘
1. 在项目目录下，win+r 输入cmd 运行     
npm install -g cnpm --registry.npm.taobao.org
2. 成功后再运行
cnpm install node-sass
3. 如果第二步报错，以管理员身份运行powerShell ，输入
set-ExecutionPolicy RemoteSigned
选择Y 或者A
关闭编辑器并再次打开，继续第二步


安装nanoid  
1. yarn add nanoid 或者 npm i nanoid
2. .引入nanoid库  nanoid库中用分别暴露的方式暴露了一个函数nanoid
    import {nanoid} from 'nanoid'
3. 使用  id:nanoid() 

react 配置less
1. npm install less less-loader --save
2. . 你需要在 webpack.config.js 中配置 Less
然而你会发现使用脚手架创建的项目中并找不到这个文件，原因就是你需要暴露它才能看到它：
npm run eject
会多出两个文件  config 和 script 文件夹
3. 打开 config-->webpack.config.js
找到sassModuleRegex 下面  增加
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
4.  找到 test: sassModuleRegex, 增加以下代码
    {
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    modules: true,
    sourceMap: isEnvProduction && shouldUseSourceMap
  },
    "less-loader"
  ),
  sideEffects: true
},
{
  test: lessModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
    modules: true,
    getLocalIdent: getCSSModuleLocalIdent
  },
    "less-loader"
  )
},


路由组件懒加载
Suspense  需要包住Link组件的内容
1. 引入 import React,{Component,lazy,Suspense} from 'react'
2. 如果Loading为一个组件  import Loading from './Loading'
3. const Home =lazy(()=>import('./Home'))
   const About=lazy(()=>import ('./About'))
4.  编写路由链接
  <Link to="/about">About</Link>
  <Link to="/home">Home</Link>

  注册路由
<Suspense fallback={<Loading/>}>
     <Route path="/about" component={About}/> 
     <Route path="/home" component={Home}/> 
</Suspense>

Hooks









