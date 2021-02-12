import { fromJS } from 'immutable';
import * as constants from './constants';

//immutable库
//immutable对象
//组件要显示list列表的内容，内容要存在store里面，它有什么数据也就是reducer决定的，reducer拆成了很多部分；home页面下的topic组件一定要存在home组件对应的reducer之中。也就是home下的store之中。组件要用这里的数据，要import {connect}让Topic组件和store做连接，就可以取出里面的数据展示在页面上.mapState(), connect(mapState,null)(Topic)
//JS对象转化成immutable对象，保证原始state不被修改
const defaultState = fromJS ({
  topicList: [],
  articleList: [],
  recommendList: [],
  writerList:[],
  articlePage: 1,
  showScroll: false
});



//reducer导出的是一个纯函数
export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_HOME_DATA:
      return state.merge({//相当于.set.set.set,还要return出去
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList),
        writerList: fromJS(action.writerList)
      });
     // state.set('topList', fromJS(action.topicList))//用JS对象替换immutable对象，要转换
    case constants.ADD_ARTICLE_LIST:
      return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
      });
      // return state.set('articleList', state.get('articleList').concat(action.list));

    case constants.TOGGLE_SCROLL_TOP:
      return  state.set('showScroll', action.show) 
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