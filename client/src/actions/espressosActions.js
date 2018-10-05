export const fetchEspressos = originId => {
  return dispatch => {
    dispatch({type: "LOADING_ESPRESSOS"});
    return fetch(`/api/v1/origins/${originId}/espressos`)
      .then(resp => resp.json())
      .then(json => json.espressos)
      .then(espressos => dispatch({type: "FETCH_ESPRESSOS", espressos}));
  }
}

export const addEspresso = espresso => ({type: "ADD_ESPRESSO", espresso});

export const updateEspresso = espresso => ({type: "UPDATE_ESPRESSO", espresso});

export const deleteEspresso = espressoId => ({type: "DELETE_ESPRESSO", espressoId});
