import React, { useEffect } from "react"
import { Dimensions, ImageSourcePropType, ImageStyle, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AnimatePresence } from '@tamagui/animate-presence'
import { AlignCenter, AlignCenterHorizontal, ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, Image, XStack, YStack, styled } from 'tamagui'
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { config } from '@tamagui/config/v3'

type ImageCarouselProps = {
    ImgStyle?: StyleProp<ImageStyle>
    ImgDataset?: Record<string, string> | undefined
    ImgSource: ImageSourcePropType | undefined
}

const screenWidth = Dimensions.get('window').width

const GalleryItem = styled(YStack, {
  zIndex: 1,    //ESSE INFELIZ
  x: 0,
  opacity: 1,
  fullscreen: true,

  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    going: {
      ':number': (going: any) => ({
        enterStyle: {
          x: going > 0 ? 1000 : -1000,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: going < 0 ? 1000 : -1000,
          opacity: 0,
        },
      }),
    },
  } as const,
})

const photos = [
  'https://picsum.photos/500/300',
  'https://picsum.photos/501/300',
  'https://picsum.photos/502/300',
]

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ImageCarousel = (props: ImageCarouselProps) => {
    const tamaguiConfig = createTamagui(config)
    
    const [[page, going], setPage] = useState([0, 0])

    const imageIndex = wrap(0, photos.length, page)
    
    const paginate = (going: number) => {
        setPage([page + going, going])
    }

     return (
       <TamaguiProvider config={tamaguiConfig}>
    <XStack
      overflow="hidden"
      //backgroundColor="#000"
      position="relative"
      height={200}
      width="100%"
      alignItems="center"
    >

      <TouchableOpacity onPress={() => paginate(-1)} style={styles.buttonLeft}>
        <Text>Amogus</Text>
      </TouchableOpacity>

      <AnimatePresence initial={false} custom={{ going }}>
        <GalleryItem key={page} animation="slowest" going={going}>
          <Image source={{ uri: photos[imageIndex]}} style={{alignSelf: 'center', flex: 1, aspectRatio: 1}} resizeMode="contain"/>
        </GalleryItem>          
      </AnimatePresence>

      <TouchableOpacity onPress={() => paginate(1)} style={styles.buttonRight}>
        <Text>Amogus</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => paginate(-1)} style={styles.buttonLeft}>
            <Text>Amogus</Text>
      </TouchableOpacity> */}

      {/* <Button accessibilityLabel="Carousel left" icon={ArrowLeft} size="$5" position="absolute" left="$1" circular elevate zIndex={100} /> */}

      {/* <Button accessibilityLabel="Carousel right" icon={ArrowRight} size="$5" position="absolute" right="$1" circular elevate zIndex={100}/> */}

    </XStack>
    </TamaguiProvider>
  )
}

const styles = StyleSheet.create({
    Container: {
        
    },
    Img: {
        marginHorizontal: wp(3.5),
    },
    imgButton: {
      zIndex: 100,
      position: "absolute",
    },
    buttonLeft: {
      position: "absolute",
      top: 90, bottom: 90, left: 0,
      backgroundColor: "slateblue",
      zIndex: 2,
    },
    buttonRight: {
      position: "absolute",
      top: 90, bottom: 90, right: 0,
      backgroundColor: "slateblue",
      zIndex: 2,
    }
})

export default ImageCarousel