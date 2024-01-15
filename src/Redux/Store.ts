import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';

import UserReducer from './Reducers/UserReducer';
import AlbumReducer from './Reducers/AlbumReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  albums: AlbumReducer,
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
