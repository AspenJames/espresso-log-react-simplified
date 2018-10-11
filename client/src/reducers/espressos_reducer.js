export default function espressosReducer(state = defaultState, action) {
  switch(action.type) {
    case "LOADING_ESPRESSOS":
      return {...state, loading: true}

    case "FETCH_ESPRESSOS":
      return {loading: false, espressos: action.espressos}

    case "ADD_ESPRESSO":
      return {...state, espressos: state.espressos.concat(action.espresso)}

    case "UPDATE_ESPRESSO":
      const idx = state.espressos.indexOf(state.espressos.find(esp => esp.id === action.espresso.id));
      let new_espressos = JSON.parse(JSON.stringify(state.espressos));
      new_espressos[idx] = action.espresso;
      return {...state, espressos: new_espressos, request_pending: false}

    case "SENDING_REQUEST":
      return {...state, request_pending: true}

    case "DELETE_ESPRESSO":
      return {...state, espressos: state.espressos.filter(esp => esp.id !== action.espressoId), request_pending: false}

    case "RESET_STATE":
      return {...state, espressos: action.payload.espressos.espressos};

    case "@@RESET":
      return defaultState;

    default:
      return state;
  }
}

const defaultState = {loading: false, request_pending: false, espressos: []}
