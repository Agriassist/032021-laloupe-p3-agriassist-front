export const initialState = {
  token: undefined,
  status: undefined,
  id: undefined,
  materielId: null,
  popup: null,
  profil_picture: 'twitter.jpg',
  name: null,
};

const reducer = (state, action) => {
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
    case 'SET_PROFIL_PICTURE': {
      return { ...state, profil_picture: action.profil_picture };
    }
    case 'RESET_PROFIL_PICTURE': {
      return { ...state, profil_picture: 'twitter.jpg' };
    }
    case 'SET_NAME': {
      return { ...state, name: action.name };
    }
    case 'RESET_NAME': {
      return { ...state, name: null };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
