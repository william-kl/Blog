import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';

export const changePage = (page) => ({//new char page, action.page send to reducer
  type: constants.CHANGE_PAGE,
  page
})

export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE,
})
export const mouseEnter = () => ({
  type: constants.MOUSE_ENTER,
});

//creat an action,return an object，receive data and return data
const changeList = (data) => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data),//change it to immutable type，then send to list，because list is immutable type too
  totalPage: Math.ceil(data.length / 10)//qu zheng
})


export const searchFocus = () => ({//return object
  type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
  type: constants.SEARCH_BLUR
});



export const getList = () => {//use thunk, we can return a function
  return (dispatch) => {//async request axios
    axios.get('/api/headerList.json').then((res) => {//under public dir we create an api,then create headerList.json,as an interface from back_end
      const data = res.data;
      // const action = {
      //   type: 'change_list',
      //   data: data.data ["]
      // }
      // dispatch(action);
      const action = changeList(data.data);
      dispatch(action);
    }).catch(() => {
      console.log('error')
    })
  }
}