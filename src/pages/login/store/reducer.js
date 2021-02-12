import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS ({
  login: false
});




export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', action.value)
    case constants.LOGOUT:
      return state.set('login', action.value) 
    default:
      return state;
  }
}

// export default (state = defaultState, action) => {
//   switch(action.type){
//     case constants.SEARCH_FOCUS:
//       return state.set('focused', true);//后面不必加break了，因为return出去了
//     case constants.SEARCH_BLUR:
//       return state.set('focused', false); 
//     case constants.CHANGE_LIST:
//       return state.set('list', action.data);  
//     default:
//       return state;   
//   }
// }