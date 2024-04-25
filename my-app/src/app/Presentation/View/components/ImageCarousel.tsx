import React from "react"
import { Dimensions, Image, ImageSourcePropType, ImageStyle, ScrollView, StyleProp, StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

type ImageCarouselProps = {
    ImgStyle?: StyleProp<ImageStyle>
    ImgDataset?: Record<string, string> | undefined
    ImgSource: ImageSourcePropType | undefined
}

const screenWidth = Dimensions.get('window').width

const ImageCarousel = (props: ImageCarouselProps) => {

    return (
        <ScrollView style={styles.Container} horizontal={true}>
            <Image source={props.ImgSource} style={[props.ImgStyle, styles.Img]} dataSet={props.ImgDataset}/>
            <Image source={props.ImgSource} style={[props.ImgStyle, styles.Img]} dataSet={props.ImgDataset}/>
            <Image source={props.ImgSource} style={[props.ImgStyle, styles.Img]} dataSet={props.ImgDataset}/>
            <Image source={props.ImgSource} style={[props.ImgStyle, styles.Img]} dataSet={props.ImgDataset}/>
            <Image source={props.ImgSource} style={[props.ImgStyle, styles.Img]} dataSet={props.ImgDataset}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Container: {
        
    },
    Img: {
        marginHorizontal: wp(3.5),
    }
})

export default ImageCarousel