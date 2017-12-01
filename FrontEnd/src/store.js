/**
 * Created by chenzhongying on 2017/10/30.
 */
import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import choose from './reducers/choose';
import data from './reducers/data';
const reducer = combineReducers({
    choose:choose,
    data:data
});
const store = createStore(reducer,applyMiddleware(thunk));
export default store;