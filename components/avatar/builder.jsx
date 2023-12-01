import Avatar from "./avatar";
import { avatarItems } from "./items";
import { useReducer } from "react";
import { COLORS } from "../../constants";
import { SKINCOLOR } from "./avatar.styles";
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
  itemIndex: Object.values(maleItemChoices)[0].findIndex(obj => obj.name === baseMale[Object.keys(maleItemChoices)[0]].name)
};

const calculateNewIndex = (currentIndex, itemCount, increment=true) => {
  if (itemCount <= 1) { return 0 }

  const direction = increment ? 1 : -1;
  let newIndex = currentIndex + direction;

  if (newIndex < 0) { newIndex = itemCount - 1 }
  else if (newIndex >= itemCount) { newIndex = 0 }
  return newIndex;
};

const reducer = (state, action) => {
  let index, itemCount, newIndex, choices, initItemIndex, avatar, category;

  switch (action.type) {
    case 'setMale':
      initItemIndex = state.choicesM[state.category].findIndex(obj => obj.name === state.avatarM[state.category].name);
      return { ...state, gender: 'M', itemIndex: initItemIndex }

    case 'setFemale':
      initItemIndex = state.choicesF[state.category].findIndex(obj => obj.name === state.avatarF[state.category].name);
      return {...state, gender: 'F', itemIndex: initItemIndex }

    case 'setCategory':
      category = action.payload;
      avatar = state[`avatar${state.gender}`];
      choices = state[`choices${state.gender}`];
      initItemIndex = choices[category].findIndex(obj => obj.name === state[`avatar${state.gender}`][category].name);
      return {...state, category: action.payload, itemIndex: initItemIndex}

    case 'prevItem':
      index = state.itemIndex;
      itemCount = state.gender === 'M' ? state.choicesM[state.category].length : state.choicesF[state.category].length;
      newIndex = calculateNewIndex(index, itemCount, false)

      return {...state, itemIndex: newIndex}

    case 'nextItem':
      index = state.itemIndex;
      itemCount = state.gender === 'M' ? state.choicesM[state.category].length : state.choicesF[state.category].length;
      newIndex = calculateNewIndex(index, itemCount, true)
      return {...state, itemIndex: newIndex}

    // case 'equipItem':
    //   const category = Object.keys(action.payload)[0];
    //   const item = Object.values(action.payload)[0];
    //   const newState = { ...state };
    //   if (state.gender === 'M') {
    //     newState.avatarM[category] = item
    //   } else {
    //     newState.avatarF[category] = item
    //   }
    //   return newState;

    default: return state;
  }
}

export const AvatarBuilder = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  const setMale = () => dispatch({type: 'setMale'});
  const setFemale = () => dispatch({type: 'setFemale'});
  const setCategory = (payload) => dispatch({type: 'setCategory', payload: payload})
  const prevItem = () => dispatch({type: 'prevItem'});
  const nextItem = () => dispatch({type: 'nextItem'});
  // const equipItem = (payload) => dispatch({type: 'equipItem', payload: payload});

  const gender = state.gender;

  const [avatar, choices, category, itemIndex] = state.gender === 'M' ? [state.avatarM, state.choicesM, state.category, state.itemIndex] : [state.avatarF, state.choicesF, state.category, state.itemIndex];

  const categories = Object.keys(choices);
  const items = choices[category];

  const pallete = category === 'skin' ? SKINCOLOR : COLORS;

  const item = items[itemIndex];

  return { avatar, choices, gender, categories, category, items, itemIndex, item, pallete, setMale, setFemale, setCategory, prevItem, nextItem };
}