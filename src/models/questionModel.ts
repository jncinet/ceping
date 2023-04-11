import {
  getQuestion,
  getQuestionList,
} from '@/services/question/QuestionController';
import { Effect, Reducer, Subscription } from 'umi';
import { getIdWithPathname } from '@/utils/util';

export interface QuestionModelState {
  items: API.Question[];
  item?: API.Question;
}

export interface QuestionModelType {
  namespace: 'questionModel';
  state: QuestionModelState;
  effects: {
    getItems: Effect;
    getItem: Effect;
  };
  reducers: {
    updateItems: Reducer<QuestionModelState>;
    updateItem: Reducer<QuestionModelState>;
  };
  subscriptions: { setup: Subscription };
}

const QuestionModel: QuestionModelType = {
  namespace: 'questionModel',
  state: {
    items: [],
  },

  effects: {
    *getItems({ payload }, { call, put }) {
      const response: API.Result<Array<API.Question>> = yield call(
        getQuestionList,
        payload,
      );
      yield put({ type: 'updateItems', payload: response.data });
    },
    *getItem({ payload }, { call, put }) {
      const response: API.Result<API.Question> = yield call(
        getQuestion,
        payload,
      );
      yield put({ type: 'updateItem', payload: response.data });
    },
  },

  reducers: {
    updateItems(state, action) {
      return {
        ...state,
        items: action.payload,
      };
    },
    updateItem(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 初始化时执行
      const { pathname: initPathname } = history.location;
      if (initPathname === '/') {
        dispatch({
          type: 'getItems',
          payload: {},
        });
      } else if (initPathname.startsWith('/show/')) {
        dispatch({
          type: 'getItem',
          payload: getIdWithPathname(initPathname),
        });
      }
      // 路径变化时执行
      return history.listen((listener) => {
        const { pathname } = listener.location;
        if (pathname === '/') {
          dispatch({
            type: 'getItems',
            payload: {},
          });
        } else if (pathname.startsWith('/show/')) {
          dispatch({
            type: 'getItem',
            payload: getIdWithPathname(pathname),
          });
        }
      });
    },
  },
};

export default QuestionModel;
