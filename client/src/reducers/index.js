import { combineReducers } from 'redux';
import coffeeShopReducer from './coffee_shop_reducer';
import espressosReducer from './espressos_reducer';
import originsReducer from './origins_reducer';

const rootReducer = combineReducers({
  coffeeShop: coffeeShopReducer,
  espressos: espressosReducer,
  origins: originsReducer
});

export default rootReducer;