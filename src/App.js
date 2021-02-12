import React, { Component }from 'react';
import Header from './common/header/index.js';
import store from './store';
import { Provider } from 'react-redux';//Provider把store里的数据提供给内部的所有组件
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';

//访问/detail能跟根路径'/'匹配上，要用exact才只显示Detail
//detail/1和detail/:id匹配
//detail?id=1和/detail匹配，也就是下面这种，detail?id=1在List.js里
class App extends Component {
  render(){
    return (
      <Provider store={store}>
       
          <BrowserRouter>
            <div>
              <Header />
              <Route path='/' exact component={Home}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/write/:id' exact component={Write}></Route>
            </div>
          </BrowserRouter>
      
      </Provider>  
    );
  }
}

export default App;
