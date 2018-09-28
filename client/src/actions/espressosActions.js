export const fetchEspressos = originId => {
  return dispatch => {
    dispatch({type: "LOADING_ESPRESSOS"});
    return fetch(`/api/v1/origins/${originId}/espressos`)
      .then(resp => resp.json())
      .then(json => json.espressos)
      .then(espressos => dispatch({type: "FETCH_ESPRESSOS", espressos}));
  }
}
