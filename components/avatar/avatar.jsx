import { Svg } from "react-native-svg";
import { avatarItems } from "./items";
import { avatarPalettes } from "./items";
import { memo } from "react";

// Simplify SVG export data structure, add color array to item instances
// { [category]: { [type]: { [name]: ...itemData } } } => { [category]: [...itemData] }
export const getAvatarItemSet = () => {
  const avatarCategories = Object.entries(avatarItems);
  const maleItemChoices = {};
  const femaleItemChoices = {};
  avatarCategories.forEach((category) => {
    const maleChoices = [];
    const femaleChoices = [];
    Object.entries(category[1]).forEach(([type, itemSet]) => {
      const maleTypeChoices = [];
      const femaleTypeChoices = [];
      Object.keys(itemSet).forEach((name) => {
        const itemObj = itemSet[name];
        const colors = [];
        itemObj['colors'] = colors;
        itemObj['name'] = name;
        if (itemObj.M) { maleChoices.push(itemObj) };
        if (itemObj.F) { femaleChoices.push(itemObj)};
        if (itemObj.M) { maleTypeChoices.push(itemObj) };
        if (itemObj.F) { femaleTypeChoices.push(itemObj)};
      })
    });
    maleItemChoices[category[0]] = maleChoices,
    femaleItemChoices[category[0]] = femaleChoices
  });
  return { maleItemChoices, femaleItemChoices };
}

// Create default avatars for avatar builder
export const baseAvatar = (gender='M') => {
  const { maleItemChoices, femaleItemChoices } = getAvatarItemSet();
  const itemChoices = gender === 'M' ? maleItemChoices : femaleItemChoices;
  const avatar = {};
  Object.keys(itemChoices).forEach((category) => {
    const vals = {};
    const itemObj = itemChoices[category][0];
    vals['name'] = itemObj.name;
    vals['type'] = itemObj.type;
    const scheme = itemObj.scheme;
    const palette = Object.values(avatarPalettes[category].default);
    const colors = [];
    if (category === 'skin') {
      colors.push(palette[0]);
    } else {
      for (let i = 0; i < scheme; i++) {
        colors.push(palette[Math.round(Math.round((palette.length - 1) * Math.ceil(Math.random() * 100))/100)]);
      }
    }
    vals['colors'] = colors;
    avatar[category] = vals;
  });
  return avatar;
}

const testAvatar = baseAvatar();

export const AvatarItem = memo(({category, item, colors=null}) => (avatarItems[category][item.type][item.name].obj(colors === null ? item.colors : colors)));

const Avatar = ({ avatar=testAvatar }) => {
  return (
    <Svg id="stage-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400">
      { Object.keys(avatar).map((category, index) => <AvatarItem category={category} item={avatar[category]} key={index} />) }
    </Svg>
  )
}

export default Avatar;