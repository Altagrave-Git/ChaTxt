import { useReducer } from "react";
import { getAvatarItemSet, baseAvatar } from "./avatar";
import { avatarPalettes } from "./items";

const baseMale = baseAvatar('M');
const baseFemale = baseAvatar('F');

const { maleItemChoices, femaleItemChoices } = getAvatarItemSet();

const initial = {
  avatarM: baseMale,
  avatarF: baseFemale,
  choicesM: maleItemChoices,
  choicesF: femaleItemChoices,
  gender: 'M',
  category: Object.keys(maleItemChoices)[0],
  itemIndex: Object.values(maleItemChoices)[0].findIndex(obj => obj.name === baseMale[Object.keys(maleItemChoices)[0]].name),
  currentColors: (() => {
    const currentColors = {};
    Object.entries(baseMale).forEach((entry) => {
      currentColors[entry[0]] = [...entry[1].colors];
      const colorCount = entry[1].colors.length;
      const palette = Object.values(avatarPalettes[entry[0]].default);

      for (let i = colorCount; 3 > i; i++) {
        currentColors[entry[0]].push(palette[Math.round(Math.round((palette.length - 1) * Math.ceil(Math.random() * 100))/100)]);
      }
    });
    return currentColors;
  })()
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
  let itemCount, newIndex, choices, initItemIndex, avatar, category;

  switch (action.type) {
    case 'setMale':
      return { ...state, gender: 'M', itemIndex: state.choicesM[state.category].findIndex(obj => obj.name === state.avatarM[state.category].name) }

    case 'setFemale':
      return {...state, gender: 'F', itemIndex: state.choicesF[state.category].findIndex(obj => obj.name === state.avatarF[state.category].name) }

    case 'setCategory':
      category = action.payload;
      avatar = state[`avatar${state.gender}`];
      choices = state[`choices${state.gender}`];
      initItemIndex = choices[category].findIndex(obj => obj.name === state[`avatar${state.gender}`][category].name);
      return {...state, category: action.payload, itemIndex: initItemIndex}

    case 'prevItem':
      itemCount = state.gender === 'M' ? state.choicesM[state.category].length : state.choicesF[state.category].length;
      newIndex = calculateNewIndex(state.itemIndex, itemCount, false)
      return {...state, itemIndex: newIndex}

    case 'nextItem':
      itemCount = state.gender === 'M' ? state.choicesM[state.category].length : state.choicesF[state.category].length;
      newIndex = calculateNewIndex(state.itemIndex, itemCount, true)
      return {...state, itemIndex: newIndex}

    case 'equipItem':
      const { colors, name, type } = state[`choices${state.gender}`][state.category][state.itemIndex];
      const itemToEquip = {colors: colors, name: name, type: type};
      return {
        ...state,
        [`avatar${state.gender}`]: {
          ...state[`avatar${state.gender}`],
          [state.category]: itemToEquip 
        }
      };

    default: return state;
  }
}

export const AvatarBuilder = (avatarData=null) => {
  const [state, dispatch] = useReducer(reducer, initial);

  const gender = state.gender;
  
  const [avatar, choices, category, itemIndex] = state.gender === 'M' ? [state.avatarM, state.choicesM, state.category, state.itemIndex] : [state.avatarF, state.choicesF, state.category, state.itemIndex];
  
  const categories = Object.keys(choices);
  
  const items = choices[category];

  const palette = avatarPalettes[category];
  
  const item = items[itemIndex];
  
  const setMale = () => dispatch({type: 'setMale'});
  const setFemale = () => dispatch({type: 'setFemale'});
  const setCategory = (payload) => dispatch({type: 'setCategory', payload: payload})
  const prevItem = () => dispatch({type: 'prevItem'});
  const nextItem = () => dispatch({type: 'nextItem'});
  const equipItem = () => dispatch({type: 'equipItem'});
  
  item['colors'] = state.currentColors[category].slice(0, item.scheme);
  
  return { avatar, choices, gender, categories, category, items, itemIndex, item, palette, setMale, setFemale, setCategory, prevItem, nextItem, equipItem };
}