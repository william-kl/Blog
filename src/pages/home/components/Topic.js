import React, { PureComponent } from 'react';
import { TopicWrapper, TopicItem} from '../style';
import { connect } from 'react-redux';

class Topic extends PureComponent {
  render() {//item is immutable type，can't use ., use get
    return (
      <TopicWrapper>
        {
          this.props.list.map ((item) => {
            return (
              <TopicItem key={item.get('id')}>
                <img className='topic-pic'
                src={item.get('imgUrl')} alt=''
                />
                {item.get('title')}
              </TopicItem>
        
            )
          })
        }  
      </TopicWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home','topicList'])
  //list: state.get('home').get('topicList')//从store中拿到数据，在改上面
});

export default connect(mapState, null)(Topic);

