import { combineReducers } from 'redux';
import {authentication} from './authentication'; 
import {categories} from './categories'; 
import {post} from './post'; 

const rootReducer = combineReducers({
    authentication,
    categories,
    post
});
  
export default rootReducer;