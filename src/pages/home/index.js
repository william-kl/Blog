import React, { PureComponent } from 'react';
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { connect } from 'react-redux';
import { actionCreators } from './store';


class Home extends PureComponent {//purecomponent has shouldComponentUpdata,有性能优化, must use with immutable

  handleScrollTop(){
    window.scrollTo(0,0);
  }
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className='banner-img' src="https://i.guim.co.uk/img/media/0eb6c570f90c4a2c594ca991c3809026ed844d85/336_76_3473_2084/master/3473.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=6d6653b1217cff589f73f5833606fb88" alt=''/>
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>Back2Top</BackTop> : null}
        
      </HomeWrapper>
      
    )
  }
  componentDidMount(){//先setup页面，完了再请求数据,请求完数据创建action,然后跟store做连接用connect方法
    this.props.changeHomeData();
    this.bindEvents();
  }
  bindEvents(){
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }
  componentWillUnmount(){//组件销毁的时候，把window全局的事件绑定也给祛除了，这样这个组件的事件就不会影响其他的组件
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }


}

const mapDispatch = (dispatch) => ({
  changeHomeData (){
    const action = actionCreators.getHomeInfo();//action是一个函数，因为getHomeInfo()用thunk返回一个函数
    dispatch(action);//action派发给store actionCreators
  },
  changeScrollTopShow(e){
    if(document.documentElement.scrollTop > 100){//>400让它显示
      dispatch(actionCreators.toggleTopShow(true))
    }else{
      dispatch(actionCreators.toggleTopShow(false))
    }
    //console.log(document.documentElement.scrollTop);//显示滚动的距离
  }
});
//暂时用不到store用的数据，所以为null;但要往里面传值用mapDispatch

const mapState = (state) => ({//去reducer里拿showScroll数据
  showScroll: state.getIn(['home', 'showScroll'])
})
export default connect(mapState, mapDispatch)(Home);