export default function originsReducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_ORIGIN":
      return {origins: state.origins.concat(action.origin)};

    case "@@RESET":
      return defaultState;

    default:
      return state;
  }
}

const defaultState = {origins: []}
