export default function originsReducer(state = defaultState, action) {
  switch (action.type) {
    case "POSTING_ORIGIN":
      return {...state, posting: true};

    case "ADD_ORIGIN":
      return {origins: state.origins.concat(action.origin), posting: false};

    case "RESET_STATE":
      return {origins: action.payload.origins.origins, posting: false};

    case "@@RESET":
      return defaultState;

    default:
      return state;
  }
}

const defaultState = {posting: false, origins: []}
