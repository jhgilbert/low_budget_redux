// LIBRARY CODE

function createStore() {
  let state = "I'm the state!";

  const getState = () => state;

  const handleStateChange = () => {
    listeners.map(listener => listener());
  };

  const testStateChangeForNow = () => {
    handleStateChange();
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

  return {
    getState,
    subscribe,
    testStateChangeForNow
  };
}

// APPLICATION CODE

const store = createStore();

console.log("App: The initial state is");
console.log(store.getState());

const listener = () => {
  console.log("I'm a listener and I'm running right now!");
};

console.log("App: Attempting subscription.");
const unsubscribe = store.subscribe(listener);

console.log("Testing state change.");
store.testStateChangeForNow();

unsubscribe();

console.log("Testing state change after unsubscribe.");
store.testStateChangeForNow();
