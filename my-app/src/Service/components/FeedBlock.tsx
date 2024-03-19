import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";
import { useQuery } from "@tanstack/react-query";
import LoadingBox from "./LoadingIcon";
import ErrorMessage from "./ErrorMessage";

const fetchFeed = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

export function FeedQuery() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['data'],
        queryFn: fetchFeed,
    });

    if (isLoading) {
        return (
            <LoadingBox />
        )
    }

    if (isError && error) {
        return (
            <ErrorMessage message={error.message} />
        )
    }


    return (
        <View>
            {data && data.map(item => (
            <View style={styles.feedblock} key={item.id}>
                <View style={styles.firstline}>
                    <Image source={require('../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
                     <Text style={styles.usertext}> {item.userId} </Text>
                    <Pressable style={styles.options}>
                    <Image source={require('../../../assets/icons/icons8-menu-2-24.png')}/>
                    </Pressable>
                </View>
                 <Text style={styles.infotext}> 
                 {item.body}
                 </Text>

                <View style={styles.middleline}>
                    <Image source={require('../../../assets/pictures/riff.jpg')} style={styles.missingpic} dataSet={{media: ids.missingpic}}/>
                    <Image source={require('../../../assets/pictures/riff.jpg')} style={styles.missingpic} dataSet={{media: ids.missingpic}}/>
                </View>

               <View style={styles.endline}>
                   <View style={styles.status} dataSet={{media: ids.status}}/>
                    <Text style={styles.statustext}>Status: {item.title}</Text>
                    <Image source={require('../../../assets/icons/icons8-mensagens-100_Feed.png')} style={styles.chaticon} />
                </View>
                <Text style={styles.time}>Há: {item.id} {item.id < 2 ? 'hora atrás' : 'horas atrás'}</Text>
            </View>
            ))
            }
        </View>
    )
}

const FeedBlock = () => {
    return (
        <View>
            <FeedQuery />
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
        marginHorizontal: wp(1),
        
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
        marginRight: wp(18),
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