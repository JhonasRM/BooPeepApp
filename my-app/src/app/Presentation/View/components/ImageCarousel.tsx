import React, { useEffect } from "react"
import { Dimensions, ImageSourcePropType, ImageStyle, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AnimatePresence } from '@tamagui/animate-presence'
import { AlignCenter, AlignCenterHorizontal, ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, Image, XStack, YStack, styled } from 'tamagui'
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { config } from '@tamagui/config/v3'
import { AntDesign } from '@expo/vector-icons';

type ImageCarouselProps = {
    ImgStyle?: StyleProp<ImageStyle>
    ImgDataset?: Record<string, string> | undefined
    ImgSource: string[]
}

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

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ImageCarousel = (props: ImageCarouselProps) => {
    const photos: any = props.ImgSource

    const tamaguiConfig = createTamagui(config)
    
    const [[page, going], setPage] = useState([0, 0])

    const imageIndex = wrap(0, photos.length, page)
    
    const paginate = (going: number) => {
        setPage([page + going, going])
    }

    useEffect(() => {
      console.log(photos.length)
    }, [])

     return (
      
       <TamaguiProvider config={tamaguiConfig}>
    { photos.length > 0 ? (
    <XStack
      overflow="hidden"
      //backgroundColor="#000"
      position="relative"
      height={200}
      width="100%"
      alignItems="center"
    >
      { page == 0 ? (
        <>
        </>
      ) : (
      <TouchableOpacity onPress={() => paginate(-1)} style={styles.buttonLeft}>
        <AntDesign name="leftcircle" size={50} color="black" />
      </TouchableOpacity>
      )}

      <AnimatePresence initial={false} custom={{ going }}>
        <GalleryItem key={page} going={going}>
          <Image source={{ uri: photos[imageIndex]}} style={{alignSelf: 'center', flex: 1, aspectRatio: 1}} resizeMode="contain"/>
        </GalleryItem>          
      </AnimatePresence>

      { page == (photos.length - 1) ? (
        <>
        </>
      ) : (
      <TouchableOpacity onPress={() => paginate(1)} style={styles.buttonRight}>
        <AntDesign name="rightcircle" size={50} color="black" />
      </TouchableOpacity>
      )}

      {/* <TouchableOpacity onPress={() => paginate(-1)} style={styles.buttonLeft}>
            <Text>Amogus</Text>
      </TouchableOpacity> */}

      {/* <Button accessibilityLabel="Carousel left" icon={ArrowLeft} size="$5" position="absolute" left="$1" circular elevate zIndex={100} /> */}

      {/* <Button accessibilityLabel="Carousel right" icon={ArrowRight} size="$5" position="absolute" right="$1" circular elevate zIndex={100}/> */}

    </XStack>
    ) : (<></>)}
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
      top: 50, bottom: 50, left: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    buttonRight: {
      position: "absolute",
      top: 50, bottom: 50, right: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    }
})

export default ImageCarousel