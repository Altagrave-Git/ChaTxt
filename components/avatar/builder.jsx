import Avatar from "./avatar";
import { avatarItems } from "./items";
import { useReducer } from "react";
import { COLORS } from "../../constants";
import { SKINCOLORS } from "./avatar.styles";
import { getAvatarItemSet, baseAvatar } from "./avatar";

const baseMale = baseAvatar('M');
const baseFemale = baseAvatar('F');

const { maleItemChoices, femaleItemChoices } = getAvatarItemSet('array');

const initial = {
  avatarM: baseMale,
  avatarF: baseFemale,
  choicesM: maleItemChoices,
  choicesF: femaleItemChoices,
  gender: 'M',
  category: Object.keys(maleItemChoices)[0],
  item: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setMale':
      return { ...state, gender: 'M' }

    case 'setFemale':
      return {...state, gender: 'F' }

    case 'setCategory':
      return {...state, category: action.payload}

    case 'setItem':
      const category = Object.keys(action.payload)[0];
      const item = Object.values(action.payload)[0];
      const newState = { ...state };
      if (state.gender === 'M') {
        newState.avatarM[category] = item
      } else {
        newState.avatarF[category] = item
      }
      return newState;

    default: return state;
  }
}

export const AvatarBuilder = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  const setMale = () => dispatch({type: 'setMale'});
  const setFemale = () => dispatch({type: 'setFemale'});
  const setCategory = (payload) => dispatch({type: 'setCategory', payload: payload})
  const setItem = (payload) => dispatch({type: 'setItem', payload: payload});

  const gender = state.gender;

  const [avatar, choices, category] = state.gender === 'M' ? [state.avatarM, state.choicesM, state.category] : [state.avatarF, state.choicesF, state.category];

  const categories = Object.keys(choices);
  console.log(choices[category]);
  console.log(category);
  const items = choices[category];
  const initItemIndex = items.findIndex(obj => obj.name === avatar[category].name);

  return { avatar, choices, gender, categories, items, initItemIndex, setMale, setFemale, setCategory, setItem };
}