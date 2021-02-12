import React, { Component }from 'react';
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, SearchWrapper, Addition, Button, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem, SearchInfoList} from './style';
//import {GlobalStyle} from '../../statics/iconfont/iconfont.js';
import { CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';//connect from store, then last line add: export default connect(mapStateToProps, mapDispathToProps)(Header);

import { actionCreators } from './store';//store index.js, index.js exports actionCreators

import { Link } from 'react-router-dom';
import {actionCreators as loginActionCreators} from '../../pages/login/store';

class Header extends Component {
  
  
  getListArea = () => {
    const { focused, page, list, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage, totalPage} = this.props;

    const jsList = list.toJS();//list immutable change to list,because it doesn't support list[i]
    const pageList = [];

    if (jsList.length){
        for (let i=(page-1)*10;i<page*10;i++){//init page is 1，0~9，then 10~19
          //console.log(jsList[i]);output 10undefined,because under init, list is empty，so jsList is empty;until axios request
          pageList.push(
            <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
          )
        }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            TopSearch
            <SearchInfoSwitch onClick={() =>handleChangePage(page, totalPage)}>change</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            { pageList
              // this.props.list.map((item) => {
              //   return <SearchInfoItem key={item}>{item}</SearchInfoItem>
              // }) 
            }
          </SearchInfoList>
        </SearchInfo>
      )
    }else{
      return null;
    }
  }
  render(){
    return (
      <HeaderWrapper>
        <Link to='/'>
           <Logo />
        </Link>
      <Nav>
        <NavItem className='left active'>Main</NavItem>
        <NavItem className='left'>Download App</NavItem>
        {
          this.props.login ? <NavItem onClick={this.props.logout} className='right'>Logout</NavItem> : <Link to='/login'><NavItem className='right'>Login</NavItem></Link>
        }
        
        <NavItem className='right'><i className="iconfont"></i></NavItem>
      <SearchWrapper> 
        <CSSTransition 
          in={this.props.focused}
          timeout={200} 
          classNames="slide"
          >
            <NavSearch 
            className={this.props.focused ? 'focused': ''} 
            onFocus={() => this.props.handleInputFocus(this.props.list)} 
            onBlur={this.props.handleInputBlur}
            ></NavSearch>
           
        </CSSTransition>
      
        {this.getListArea()}
    
      </SearchWrapper>   
      </Nav>
      <Addition>
        <Link to='/write'>
          <Button className='writting'><i className="iconfont"></i>Write Article</Button>
          <Button className='reg'>Register</Button>
        </Link>
      </Addition>
    </HeaderWrapper>
      )
  }
}


 
const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),//same
    //redux-immutable changes state to immutable type
    //import { combineReducers } from 'redux-immutable' in the major reducer.js
    //focused: state.get('header').get('focused')
    list: state.getIn(['header', 'list']),
    //focused: state.header.get('focused')/
   // focused: state.header.focused  
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    totalPage: state.getIn(['header', 'totalPage']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    // handleInputFocus(){
    //   const action = {
    //     type: 'search_focus'
    //   };
    //   dispatch(action);
    // },
    handleInputFocus(list){//send an action when focus
      if (list.size === 0){//only request when list is empty
      dispatch(actionCreators.getList());
      }
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur(){
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter(){
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page, totalPage){
     // console.log(page,totalPage)
      if(page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));//jump to next page when click
      }else{//last page, then go back to 1st page
        dispatch(actionCreators.changePage(1));//changePage will receive a new page number as paramaters
      }
      
    },
    logout(){
      dispatch(loginActionCreators.logout());
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Header)