import * as constants from './constants';
import { fromJS } from 'immutable';



const defaultState = fromJS ({
  focused: false,
  list:[],
  page: 1,
  totalPage: 1,
  mouseIn: false
});
//reducer export pure function
export default (state = defaultState, action) => {
  // if(action.type === 'search_focus') {
  //   return {
  //     focused: true
  //   }
  // }
  if(action.type === constants.CHANGE_PAGE) {
    return state.set('page', action.page);
  }
  if(action.type === constants.MOUSE_LEAVE) {
    return state.set('mouseIn', false);
  }
  if(action.type === constants.MOUSE_ENTER) {
    return state.set('mouseIn', true);
  }
  if(action.type === constants.SEARCH_FOCUS) {
    return state.set('focused', true);
  }

  if(action.type === constants.SEARCH_BLUR) {
    return state.set('focused', false);
  }
  
  if(action.type === constants.CHANGE_LIST) {
    // return state.set('list', action.data).set('totalPage', action.totalPage);
    //console.log(action)
    return state.merge({
      list: action.data,
      totalPage: action.totalPage
    })
  }
  return state;
}

// export default (state = defaultState, action) => {
//   switch(action.type){
//     case constants.SEARCH_FOCUS:
//       return state.set('focused', true);
//     case constants.SEARCH_BLUR:
//       return state.set('focused', false); 
//     case constants.CHANGE_LIST:
//       return state.set('list', action.data);  
//     default:
//       return state;   
//   }
// }