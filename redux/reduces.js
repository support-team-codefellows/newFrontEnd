const inisialState = {
  newData: false,
  onSite: false,
};

export default function reducer(state = inisialState, action) {
  switch (action.type) {
    case "newDataTelephone":
      return {
        ...state,
        newData: !state.newData,
      };

    case "newDataOnSite":
      return {
        ...state,
        onSite: !state.onSite,
      };

    default:
      return state;
  }
}
