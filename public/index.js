// LIBRARY CODE

function createStore(reducer) {
  let state;

  const getState = () => state;

  const handleStateChange = () => {
    console.log("Library: running HandleStateChange with listeners");
    console.log(listeners);
    listeners.map(listener => listener());
  };

  let listeners = [];

  const subscribe = newListener => {
    const unsubscribe = () => {
      listeners = listeners.filter(listener => {
        listener !== newListener;
      });
    };
    console.log("Library: Adding listener.");
    listeners.push(listener);
    return unsubscribe;
  };

  const dispatch = action => {
    console.log("Library: Dispatch is running with action");
    console.log(action);
    state = reducer(state, action);
    handleStateChange();
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

// APPLICATION CODE

const reducer = (state = [], action) => {
  console.log("App: Reducer is running");
  return state;
};

const store = createStore(reducer);

console.log("App: The initial state is");
console.log(store.getState());

const listener = () => {
  console.log("I'm a listener and I'm running right now!");
};

console.log("App: Attempting subscription.");
const unsubscribe = store.subscribe(listener);

console.log("Testing state change.");
store.dispatch({
  type: "SILLY_TEST_ACTION"
});

console.log("App: The state is now");
console.log(store.getState());

unsubscribe();

console.log("Testing state change after unsubscribe.");
store.dispatch({
  type: "SILLY_TEST_ACTION_TWO"
});
