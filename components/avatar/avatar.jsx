import AvatarItems from "./items";
import AvatarPalettes from "./palettes";
import { Svg, G } from "react-native-svg";

export const getAvatarItemSet = () => {
  const [maleItemSet, femaleItemSet] = [{}, {}];
  Object.entries(AvatarItems).forEach(([category, categoryData]) => {
    const [maleCategoryVal, femaleCategoryVal] = [{}, {}];
    Object.entries(categoryData).forEach(([subcategory, subcategoryData]) => {
      maleCategoryVal[subcategory] = Object.values(subcategoryData).filter(item => item.M);
      femaleCategoryVal[subcategory] = Object.values(subcategoryData).filter((item) => item.F);
    });
    maleItemSet[category] = maleCategoryVal;
    femaleItemSet[category] = femaleCategoryVal;
  });
  return [maleItemSet, femaleItemSet];
}

export const baseAvatar = (gender) => {
  const [maleItemSet, femaleItemSet] = getAvatarItemSet();
  const itemSet = gender === "M" ? maleItemSet : femaleItemSet;
  const avatar = {};

  Object.entries(itemSet).forEach(([category, categoryData]) => {
    avatar[category] = {};
    Object.entries(categoryData).forEach(([subcategory, subcategoryData]) => {
      avatar[category][subcategory] = subcategoryData[0];
    });
  });

  return avatar;
}

const avatarTest = {
  body: {
    skin: { name: "Human", colors: [] }
  },
  head: {
    hair: { name: "Bald", colors: [] }
  },
  face: {
    eyes: { name: "Colored", colors: [] },
    mouth: { name: "Open_Frown", colors: [] }
  },
  upper: {
    torso: { name: "Tank", colors: [] },
    hands: { name: "Bare", colors: [] }
  },
  lower: {
    legs: { name: "Boxers_M", colors: [] },
    feet: { name: "Bare_Foot", colors: [] }
  }
}

export const AvatarItem = ({category, subcategory, item, colors=null}) => (AvatarItems[category][subcategory][item.name].obj(colors === null ? item.colors : colors));

const Avatar = ({ avatar=avatarTest }) => {
  AvatarItems["body"]["skin"]

  return (
    <Svg id="stage-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400">
      { Object.entries(avatar).map((([category, categoryData], index) => (
        <G key={index}>
          { Object.entries(categoryData).map(([subcategory, item], index) => (
            <AvatarItem category={category} subcategory={subcategory} item={item} key={index} />
          ))}
        </G>
      )
      )) }
    </Svg>
  )
}

export default Avatar;