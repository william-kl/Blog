import React, { PureComponent } from 'react';
import { DetailWrapper, Header, Content } from './style';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {actionCreators} from './store';
import { withRouter } from 'react-router-dom';


class Write extends PureComponent {
  render() {
    const { loginStatus} = this.props;

    if(loginStatus){
      return (
        <DetailWrapper>
          <Header>{this.props.title}</Header>
          <Content dangerouslySetInnerHTML={{__html: this.props.content}} />
        
        </DetailWrapper>
      )
    }else{
      return <Redirect to='/login'/>
    }
 
  }

  componentDidMount(){
    this.props.getDetail(this.props.match.params.id);
  }

}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login']),
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content']),
})



const mapDispatch = (dispatch) => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id));
  }
});

export default connect(mapState, mapDispatch)(withRouter(Write));