export const createOrigin = data => {
  return dispatch => {
    dispatch({type: "POSTING_ORIGIN"});
    return fetch('api/v1/origins', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        if (json.origin) {
          dispatch({type: "ADD_ORIGIN", origin: json.origin});
        }
      });
  }
}

export const addOrigin = origin => ({type: "ADD_ORIGIN", origin});