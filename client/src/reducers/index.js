import { combineReducers } from 'redux';
import coffeeShopReducer from './coffeeShopReducer';
import espressosReducer from './espressosReducer';
import originsReducer from './originsReducer';

const rootReducer = combineReducers({
  coffeeShop: coffeeShopReducer,
  espressos: espressosReducer,
  origins: originsReducer
});

export default rootReducer;