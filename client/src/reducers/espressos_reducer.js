export default function espressosReducer(state = defaultState, action) {
  switch(action.type) {
    case "LOADING_ESPRESSOS":
      return {...state, loading: true}

    case "FETCH_ESPRESSOS":
      return {loading: false, espressos: action.espressos}

    case "ADD_ESPRESSO":
      return {...state, espressos: state.espressos.concat(action.espresso)}

    case "RESET_STATE":
      return {...state, espressos: action.payload.espressos.espressos};

    case "@@RESET":
      return defaultState;

    default:
      return state;
  }
}

const defaultState = {loading: false, espressos: []}
