import { avatarItems } from "./items";

const AvatarItem = ({category, item}) => (avatarItems[category][item.type](item.colors)[item.name].obj);

export default AvatarItem;