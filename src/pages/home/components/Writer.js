import React, { PureComponent } from 'react';
import { WriterWrapper, WriterItem } from '../style';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Writer extends PureComponent {
  render() {
    return (
      <WriterWrapper>
      {
        this.props.list.map ((item, index) => {
          return (
            <Link  key={index} to={'/write/' + item.get('id')}>
              <WriterItem key={item.get('id')}>
                <img className='writer-pic'
                src={item.get('imgUrl')} alt=''
                />
                {item.get('title')}
              </WriterItem>
            </Link>  
      
          )
        })
      }
      </WriterWrapper> 
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home','writerList'])
  //list: state.get('home').get('topicList')//receive data from store, then use it upthere
});

export default connect(mapState, null)(Writer);