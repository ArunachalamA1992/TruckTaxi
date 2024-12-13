import {combineReducers, createStore} from 'redux';
import {MeterReducer} from './Meter/MeterReducer';
import UserReducer from './User/UserReducer';
import ThemeReducer from './Theme/ThemeReducer';

const {TripReducer} = require('./Trip/TripReducer');

const rootReducer = combineReducers({
  TripReducer: TripReducer,
  MeterReducer: MeterReducer,
  UserReducer: UserReducer,
  ThemeReducer: ThemeReducer,
});
const Store = createStore(rootReducer);
export default Store;
