function createStore() {
  let state = "I'm the state!";

  const getState = () => state;

  return {
    getState
  };
}

const store = createStore();
console.log(store.getState());
