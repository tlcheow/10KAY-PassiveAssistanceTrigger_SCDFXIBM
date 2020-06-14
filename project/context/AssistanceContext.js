import * as React from "react";

let AssistanceContext = React.createContext();

let initialState = {
  assist: "",
  count: 0,
  postalCode: 408827,
  description: "",
  address: "91 Ubi Ave 4, Singapore 408827",
};

let reducer = (state, action) => {
  console.log(state, action)
  switch (action.type) {
    case "breathing":
        return { ...state, description: "A Breathing Difficulties case needs your attention", count: state.count + 1, ...action };
    case "fall":
        return { ...state, description: "Someone has fell", count: state.count + 1, ...action };
    case "bleeding":
        return { ...state, description: "A Bleeding case needs your attention", count: state.count + 1, ...action };
    case "cardiac":
        return { ...state, description: "Cardiac Issue reqires your attention", count: state.count + 1, ...action };
    case "technical":
        return { ...state, description: "Technical Assistance needed", count: state.count + 1, ...action };
    case "medical":
        return { ...state, description: "Medical Assistance needed", count: state.count + 1, ...action };
    case "reset":
        return { ...initialState }
  }
};

function AssistanceContextProvider(props) {
  // [A]
  let [assist, assistDispatch] = React.useReducer(reducer, initialState);
  let value = { assist, assistDispatch };


  // [B]
  return (
    <AssistanceContext.Provider value={value}>{props.children}</AssistanceContext.Provider>
  );
}

let AssistanceContextConsumer = AssistanceContext.Consumer;

// [C]
export { AssistanceContext, AssistanceContextProvider, AssistanceContextConsumer };