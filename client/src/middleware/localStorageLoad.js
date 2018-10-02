export default store => next => action => {
  if (action.type === '@@INIT') {
    try {
      const storedState = JSON.parse(
        localStorage.getItem('ESPRESSO_LOG')
      );
      if (storedState) {
        store.dispatch({
          type: 'RESET_STATE',
          payload: storedState
        });
      }
      return;
    } catch (e) {
      // Unable to load or parse stored state, proceed as usual
    }
  }

  next(action);
}