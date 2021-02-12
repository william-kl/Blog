import { fromJS } from 'immutable';
import * as constants from './constants';


const defaultState = fromJS ({
  title: '',
  content: ''
});



//reducer导出的是一个纯函数
export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_DETAIL:
      return state.merge({
        title: action.title,
        content: action.content
      })
    default:
      return state;
  }
}