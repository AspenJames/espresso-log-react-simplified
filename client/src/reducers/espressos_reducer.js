export default function espressosReducer(state = defaultState, action) {
  switch(action.type) {
    case "ADD_ESPRESSO":
      return {espressos: state.espressos.concat(action.espresso)};

    case "@@RESET":
      return defaultState;

    default:
      return state;
  }
}

const defaultState = {espressos: []}
