import { Text, View } from "react-native"
import { useSelector } from "react-redux";
import { GlobalState } from "../types/types";

export default function InfoScreen() {
    const userInfo: any = useSelector((state: GlobalState) => state.userInfo);

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <Text> Informacion de la prueba</Text>
        <Text>{userInfo.name}</Text>
        </View>
    )

}
