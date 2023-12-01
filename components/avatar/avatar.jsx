import { Svg } from "react-native-svg";
import { avatarItems } from "./items";
import { SKINCOLOR } from "./avatar.styles";
import { COLORS } from "../../constants";


export const getAvatarItemSet = (repr='object') => {
  const avatarCategories = Object.entries(avatarItems);
  const maleItemChoices = {};
  const femaleItemChoices = {};
  avatarCategories.forEach((category) => {
    const maleChoices = {};
    const femaleChoices = {};
    Object.values(category[1]).forEach((item) => {
      Object.keys(item).forEach((entry) => {
        if (item[entry].M) { maleChoices[entry] = item[entry] };
        if (item[entry].F) { femaleChoices[entry] = item[entry] };
      })
    });
    maleItemChoices[category[0]] = maleChoices;
    femaleItemChoices[category[0]] = femaleChoices;
  });

  if (repr === 'array') {
    const allChoices = [maleItemChoices, femaleItemChoices]
    allChoices.forEach((choices, index) => {
      Object.keys(choices).forEach((key) => {
        const list = [];
        const itemNames = Object.keys(choices[key]);
        Object.values(choices[key]).forEach((value, index) => {
          value['name'] = itemNames[index];
          const pallete = key === 'skin' ? Object.values(SKINCOLOR) : Object.values(COLORS);
          const scheme = value.scheme;
          const colors = [];
          for (let i = 0; i < scheme; i++) {
            colors.push(pallete[Math.round(Math.round((pallete.length - 1) * Math.ceil(Math.random() * 100))/100)])
          }
          value['colors'] = colors;
          list.push(value);
        })
        index ? femaleItemChoices[key] = list : maleItemChoices[key] = list;
      })
    })
  }
  return { maleItemChoices, femaleItemChoices };
}

export const baseAvatar = (gender='M') => {
  const { maleItemChoices, femaleItemChoices } = getAvatarItemSet();
  const itemChoices = gender === 'M' ? maleItemChoices : femaleItemChoices;
  const avatar = {};
  Object.keys(itemChoices).forEach((category) => {
    const vals = {};
    const pallete = category === 'skin' ? Object.values(SKINCOLOR) : Object.values(COLORS);
    const scheme = Object.values(itemChoices[category])[0].scheme;
    const colors = [];
    for (let i = 0; i < scheme; i++) {
      colors.push(pallete[Math.round(Math.round((pallete.length - 1) * Math.ceil(Math.random() * 100))/100)])
    }
    vals['name'] = Object.keys(itemChoices[category])[0];
    vals['type'] = Object.values(itemChoices[category])[0].type;
    vals['colors'] = colors;
    avatar[category] = vals;
  })
  return avatar;
}

const testAvatar = baseAvatar();

export const AvatarItem = ({category, item}) => (avatarItems[category][item.type][item.name].obj(item.colors));

const Avatar = ({ avatar=testAvatar }) => {

  return (
    <Svg id="stage-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 385 385">
      { Object.keys(avatar).map((category, index) => <AvatarItem category={category} item={avatar[category]} key={index} />) }
    </Svg>
  )
}

export default Avatar;