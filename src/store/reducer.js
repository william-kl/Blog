import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';//store下的index.js是header store部分的一个出口文件，会自动去找index.js, index.js又导出了reducer，因此间接的引用了reducer.js
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as detailReducer } from '../pages/detail/store';
import {reducer as loginReducer } from '../pages/login/store';

//reducer是整合后大的reducer
//生成的是一个immutable的数据内容
const reducer =  combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer
})

//export default (state = defaultState, action) => {
//    if (action.type === 'search_focus'){
//      return {
//        focused: true 
//      }
//    }
//    return state;
//}
//

export default reducer;