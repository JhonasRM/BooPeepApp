import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";

const FeedBlock = () => {
    return (
        <View style={styles.feedblock}>
        {/* --------------------------------------------- */}
          <View style={styles.firstline}>
            <Image source={require('../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
            <Text style={styles.usertext}> User </Text>
            <Pressable style={styles.options}>
                <Image source={require('../../../assets/icons/icons8-menu-2-24.png')}/>
            </Pressable>
          </View>
        {/* --------------------------------------------- */}
            <Text style={styles.infotext}> 
                Lorem amogus sussy baki is the new rizz skibiritoiler ohmagad big smoke i'll have 2 number 9s a number
                9 large a number 6 with extra dip 2 number 45s one with MAC AND cheese and a large soda AND NOBODY IS STOPPING
                ME! HihehiHA! *Bad to the Bone Riff*
            </Text>
          <View style={styles.middleline}>
            <Image source={require('../../../assets/pictures/riff.jpg')} style={styles.missingpic} dataSet={{media: ids.missingpic}}/>
            <Image source={require('../../../assets/pictures/riff.jpg')} style={styles.missingpic} dataSet={{media: ids.missingpic}}/>
          </View>
        {/* --------------------------------------------- */}
          <View style={styles.endline}>
            <View style={styles.status} dataSet={{media: ids.status}}/>
            <Text style={styles.statustext}>Status: RAPAIZ</Text>
            <Image source={require('../../../assets/icons/icons8-mensagens-100_Feed.png')} style={styles.chaticon} />
          </View>
            <Text style={styles.time}>Há: 25 horas atrás</Text>
        {/* --------------------------------------------- */}
        </View>
    )
}

const {styles} = StyleSheet.create ({
    feedblock: {
        backgroundColor: "#ffffff",
        marginHorizontal: wp(5),
        marginVertical: hp(2),
        padding: 6,
        borderRadius: 10
    },
    firstline: {
        flexDirection: "row",
    },
    user: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    usertext: {
        fontWeight: "bold",
    },
    options: {
        position: "absolute",
        right: 0,  
        marginRight: 10,
    },
    infotext: {
        paddingHorizontal: wp(5)
    },
    missingpic: {
        width: 140,
        height: 140,
        marginTop: hp(2),
        marginBottom: hp(2),
        paddingHorizontal: wp(5),
        
    },
    middleline: {
        flexDirection: "row",
        justifyContent: "center"
    },
    status: {
        borderWidth: wp(2),
        borderRadius: 50,
        width: wp(1),
        height: hp(1),
        borderColor: "#ce1e1e",
        marginRight: wp(1),
    },
    statustext: {
        
    },
    time: {
        marginLeft: 10,
    },
    chaticon: {
        width: 35,
        height: 35,        
        position: "absolute",
        right: 0,
        paddingBottom: 10,
        marginRight: 10,
    },
    endline: {
        flexDirection: "row",
        marginLeft: 10,
    },
})




export default FeedBlock;