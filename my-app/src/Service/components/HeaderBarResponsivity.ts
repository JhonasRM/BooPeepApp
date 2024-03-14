import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';

export const {ids} = StyleSheet.create ({
    header: {
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
        '@media (min-width: 375px) and (max-width: 375px)': {
            marginRight: wp(6),
        },
        '@media (min-width: 414px) and (max-width: 414px)': {
            marginRight: wp(8),
        },
        '@media (min-width: 390px) and (max-width: 390px)': {
            marginRight: wp(8),
        },
        '@media (min-width: 430px) and (max-width: 430px)': {
            marginRight: wp(8),
        },
        '@media (min-width: 412px) and (max-width: 413px)': {
            marginRight: wp(8),
        },
        '@media (min-width: 360px) and (max-width: 360px)': {
            marginRight: wp(8),
        },
        '@media (min-width: 768px) and (max-width: 768px)': {
            marginRight: wp(4),
        },
        '@media (min-width: 820px) and (max-width: 820px)': {
            marginRight: wp(3),
        },
        '@media (min-width: 1024px) and (max-width: 1024px)': {
            marginRight: wp(3),
        },
        '@media (min-width: 912px) and (max-width: 912px)': {
            marginRight: wp(3),
        },
        '@media (min-width: 540px) and (max-width: 540px)': {
            marginRight: wp(5),
        },
        '@media (min-width: 280px) and (max-width: 280px)': {
            marginRight: wp(9),
        },
        '@media (min-width: 853px) and (max-width: 853px)': {
            marginRight: wp(3),
        },
        '@media (device-width: 412px), (device-height: 914)': {
            marginRight: wp(7),
        },
        '@media (min-width: 1024px), (min-height: 600) and (max-width: 1024px)': {
            marginRight: wp(2),
        },
    },
})

