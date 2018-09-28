export default function originsReducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_ORIGIN":
      return state;

    case "@@RESET":
      return defaultState;

    default:
      return state;
  }
}

const defaultState = {origins: []}
