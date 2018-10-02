export default store => next => action => {
  next(action);
  const state = store.getState();
  localStorage.setItem('ESPRESSO_LOG', JSON.stringify(state));
}