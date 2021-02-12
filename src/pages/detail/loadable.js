//把detail组件变为异步组件，可以实现异步加载的需求
//在App.js里import Detail from './pages/detail/loadable.js';
import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),//异步加载新语法，加载当前文件夹下的index.js
  loading() {
    return <div>正在加载</div>
  }
});

export default () => <LoadableComponent />

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>
//   }
// }