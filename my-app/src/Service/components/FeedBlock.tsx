import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";
import { useQuery } from "@tanstack/react-query";

const fetchFeed = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

export function FeedQuery() {
    const {data, isLoading} = useQuery({
        queryKey: ['data'],
        queryFn: fetchFeed,
    });

    if (isLoading) {
        return (
            <View>
                <Image source={require('../../../assets/gifs/icons8-círculo-de-carga.gif')} style={styles.loading} />
            </View>
        )
    }


    return (
        <View>
            {data && data.map(item => (
            <View style={styles.feedblock}>
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
                <Text style={styles.time} key={`postId-${item.id}`}>Há: {item.id} horas atrás</Text>
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
    loading: {
        width: 100,
        height: 100,
    },
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