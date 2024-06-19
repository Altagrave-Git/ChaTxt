import { getAvatarItemSet } from "./avatar";
import paletteSets from "./palettes";
import { useReducer, useState } from "react";
import { baseAvatar } from "./avatar";

const [ maleItemSet, femaleItemSet ] = getAvatarItemSet();

const initial = (avatar, gender, newUser) => ({
  avatar: avatar,
  choices:  gender === 'M' ? maleItemSet : femaleItemSet,
  category: Object.keys(gender === 'M' ? maleItemSet : femaleItemSet)[0],
  subcategory: Object.keys(Object.values(gender === 'M' ? maleItemSet : femaleItemSet)[0])[0],
})

const reducer = (state, action) => { return state };

export const AvatarBuilder = ({avatarData, gender, newUser=false}) => {
  const [ state, dispatch ] = useReducer(reducer, initial(avatarData, gender, newUser));

  const [ avatar, choices, category, subcategory ] = [state.avatar, state.choices, state.category, state.subcategory ];

  const categories = Object.keys(choices);
  const subcategories = Object.keys(choices[category]);
  const items = choices[category][subcategory];

  const setCategory = (payload) => dispatch({type: 'setCategory', payload: payload});
  const setSubcategory = (payload) => dispatch({type: 'setSubcategory', payload: payload});


  return { avatar, choices, category, subcategory, categories, subcategories, items, setCategory, setSubcategory };
};