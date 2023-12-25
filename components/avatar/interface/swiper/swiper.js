import { FlatList, View, Platform } from "react-native";
import { useRef, useEffect, useCallback } from "react";
import { Svg } from "react-native-svg";
import ItemSilhouette from "./silhouette";
import { AvatarItem } from "../../avatar";

const itemViewbox = {
  Skin: '0 0 400 400',
  Hair: '30, 15, 300, 300',
  Eyes: '30, 15, 300, 300',
  Mouth: '30, 15, 300, 300',
  Torso: '58, 165, 200, 200',
  Hands: '58, 165, 200, 200',
  Legs: '64, 210, 180, 180',
  Feet: '64, 210, 180, 180'
}

const generateSvgID = () => `G${Math.random()}`.split(".").join("-");

const ItemSwiper = ({ builder, initialIndex=0 }) => {
  const swiperRef = useRef(null);

  const category = builder.items[0].subtype;

  const type = builder.items[0].type;

  const viewBox = itemViewbox[type];

  const svgID = generateSvgID();

  useEffect(() => {
    swiperRef.current.scrollToIndex({animated: false, index: initialIndex, viewOffset: 0, viewPosition: 0});
  }, [])

  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const snappedIndex = Math.round(contentOffset.x / 360);
    builder.setScrollIndex(snappedIndex);
  }

  const getItemLayout = useCallback((data, index) => ({
    length: 360,
    offset: 360 * index,
    index
  }), [])

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={{height: "100%", width: 360}}>
        <Svg preserveAspectRatio="xMidYMid meet" viewBox={viewBox}>
          <ItemSilhouette type={item.type} svgID={svgID} />
          <AvatarItem category={category} item={item} colors={builder.currentColors[item.subtype]} />
        </Svg>
      </View>
    )
  }, [builder.currentColors, category])

  return (
    <FlatList
      ref={swiperRef}
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={builder.items}
      snapToInterval={360}
      decelerationRate="fast"
      snapToAlignment="center"
      onMomentumScrollEnd={handleMomentumScrollEnd}
      keyExtractor={item => item.name}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
    />
  )
}

export default ItemSwiper;