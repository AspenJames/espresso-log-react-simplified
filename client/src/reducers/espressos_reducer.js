export default function espressosReducer(state = {
  espressos: []
}, action) {
  switch(action.type) {
    case "ADD_ESPRESSO":
      return state;

    default:
      return state;
  }
}