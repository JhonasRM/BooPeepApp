import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';

export const {ids} = StyleSheet.create ({
    footer: {
        '@media (min-width: 280px) and (max-width: 359px)': {
            width: wp(102),
        },

        '@media (min-width: 360px) and (max-width: 374px)': {
            width: wp(100),
        },

        '@media (min-width: 375px) and (max-width: 389px)': {
            width: wp(102),
        },

        '@media (min-width: 390px) and (max-width: 411px)': {
            width: wp(100),
        },

        '@media (min-width: 412px) and (max-width: 414px)': {
            width: wp(100),
        },

        '@media (min-width: 414px) and (max-width: 429px)': {
            width: wp(100),
        },

        '@media (min-width: 430px) and (max-width: 539px)': {
            width: wp(100),
        },

        '@media (min-width: 540px) and (max-width: 767px)': {
            width: wp(100),
        },

        '@media (min-width: 768px) and (max-width: 819px)': {
            width: wp(100),
        },

        '@media (min-width: 820px) and (max-width: 852px)': {
            width: wp(100),
        },

        '@media (min-width: 853px) and (max-width: 911px)': {
            width: wp(100),
        },

        '@media (min-width: 912px) and (max-width: 1023px)': {
            width: wp(100),
        },

        '@media (min-width: 1024px) and (max-width: 1279px)': {
            width: wp(100),
        },

        '@media (min-width: 1280px)': {
            width: wp(100),
        },
    },
    button: {
        '@media (min-width: 414px)': {
            width: wp(27),
            height: hp(4),
        },

        '@media (min-width: 540px) and (max-width: 819px)': {
            width: wp(12),
            height: hp(4),
        }, //YOU NEED ALSO TO DO THE SAME WITH HEADERBAR.TSX

        '@media (min-width: 1280px)': {
            width: wp(10),
            height: hp(5),
        },
    },
    button2: {
        '@media (min-width: 768px) and (max-width: 1024px)': {
            width: wp(10),
        },
        '@media (min-width: 540px) and (max-width: 767px)': {
            width: wp(10),
        },
        '@media (min-width: 280px) and (max-width: 374px)': {
            width: wp(20),
        },
        '@media (device-width: 1024px) and (device-height: 600px)': {
            width: wp(7),
            height: hp(7)
        },
        '@media (min-width: 1280px)': {
            width: wp(7),
        },
    },
})