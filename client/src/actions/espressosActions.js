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

export const postEspresso = (originId, data) => {
    return dispatch => {
        dispatch({type: "SENDING_REQUEST"});
        return fetch(`/api/v1/origins/${originId}/espressos`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
          .then(json => {
              if (json.espresso) {
                  dispatch({type: "ADD_ESPRESSO", espresso: json.espresso})
              } else {
                  dispatch({type: "ADD_ERROR", error: json.errors})
              }
          })
    }
}

export const updateEspresso = data => {
  return dispatch => {
    dispatch({type: "SENDING_REQUEST"});
    return fetch(`/api/v1/origins/${data.originId}/espressos/${data.espresso.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        dispatch({type: "UPDATE_ESPRESSO", espresso: json.espresso});
      });
  }
}

export const deleteEspresso = (originId, espressoId) => {
  return dispatch => {
    dispatch({type: "SENDING_REQUEST"});
    return fetch(`/api/v1/origins/${originId}/espressos/${espressoId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({espressoId: espressoId})
    }).then(resp => resp.json())
      .then(json => {
        dispatch({type: "DELETE_ESPRESSO", espressoID: json.espresso.id});
      });
  }
}
