import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store'
import { Redirect } from 'react-router-dom';

//下面的账号密码分别存在this.account和this.password里
//在onClick里分别把他们传进去,也就是传到login方法里
//styled-components提供的innerRef
class Login extends PureComponent {
  render() {
    const { loginStatus, login} = this.props;

    if(!loginStatus){//没登录，显示登录界面
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder="Account" ref={(input)=>{this.account = input}}/>
            <Input placeholder="Password" type='password' ref={(input)=>{this.password = input}}/>
            <Button onClick={()=>login(this.account, this.password)}>Login</Button>
          </LoginBox>
        </LoginWrapper>
      )
    }else{
      return <Redirect to='/'/>
    }
 
  }

  componentDidMount(){
    
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
  login(accountElem, passwordElem){
    dispatch(actionCreators.login(accountElem.value, passwordElem.value))
    //console.log(accountElem.value, passwordElem.value);
  }
});

export default connect(mapState, mapDispatch)(Login);