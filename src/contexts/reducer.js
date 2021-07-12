export const initialState = {
  token: undefined,
  status: undefined,
  id: undefined,
  materielId: null,
  popup: null,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case 'SET_TOKEN': {
      return { ...state, token: action.token };
    }
    case 'RESET_TOKEN': {
      return { ...state, token: undefined };
    }
    case 'SET_STATUS': {
      return { ...state, status: action.status };
    }
    case 'RESET_STATUS': {
      return { ...state, status: undefined };
    }
    case 'SET_ID': {
      return { ...state, id: action.id };
    }
    case 'RESET_ID': {
      return { ...state, id: undefined };
    }
    case 'SET_MATERIEL_ID': {
      return { ...state, materielId: action.materielId };
    }
    case 'RESET_MATERIEL_ID': {
      return { ...state, materielId: null };
    }
    case 'SET_POPUP': {
      return { ...state, popup: action.popup };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
