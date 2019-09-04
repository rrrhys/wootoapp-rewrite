import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions, View } from "react-native";

import { Image } from "react-native-elements";
import React from "react";
import { Image as WooCommerceImage } from "../types/woocommerce";

export interface Props {
  width: number;
  height: number;
  onSnapToItem: (index) => void;
  images: Array<WooCommerceImage>;
  activeSlide: number;
}

class ImageCarousel extends React.Component<Props> {
  _carousel;

  _renderItem({ item, index }) {
    const { width } = Dimensions.get("window");
    let imageStyle = {
      width: width,
      height: width,
      margin: 0
    };

    return (
      <View>
        <Image source={{ uri: item.src }} style={imageStyle} />
      </View>
    );
  }

  render() {
    const { width, height, onSnapToItem, images, activeSlide } = this.props;
    return [
      <View style={{ maxHeight: width }}>
        {images && (
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={images}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
            itemHeight={width}
            sliderHeight={width}
            onSnapToItem={onSnapToItem}
          />
        )}
      </View>,
      images && images.length > 1 && (
        <View style={{ marginTop: -50 }}>
          <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 4,
              backgroundColor: "#000000"
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.2}
            inactiveDotScale={0.6}
          />
        </View>
      )
    ];
  }
}

export default ImageCarousel;
