const inisialState = {
  newData: false,
  onSite: false,
  rateing : {  rating: "", username: ""}
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
    case "RATING":
      return {
        ...state,
        rateing: action.payload,
      };
    default:
      return state;
  }
}
