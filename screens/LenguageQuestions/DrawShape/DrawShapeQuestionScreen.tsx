import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text} from "react-native";
import { Svg, Path } from 'react-native-svg';
import QuestionTitle from "../../../components/QuestionTitle";
import Header from "../../../components/Header";
import { useDispatch, useSelector} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "../../../components/SecondaryButton";
import { progressActions } from "../../../reducers";
import { GlobalState } from "../../../types/types";
import { incrementValue } from "../../../constants/constants";

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#092C4C",
        justifyContent: 'space-between',
    },
    questionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        margin: 48,


        width: '90%',
        height: '60%',
        borderRadius: 24,
        overflow: 'hidden'
    },
    isEnable: {
        borderColor: '#7CE9CD',
        borderWidth:3

    },
    svgContainer: {
        height: height * 0.6,
        width: width * 0.9,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth:1,
        marginVertical: 12
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});


export default function DrawShapeQuestionScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

    const [paths, setPaths] = useState([`M179,171`]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isClearButtonClicked, setClearButtonClicked] = useState(false);

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {

        if(paths.length > 1){

            setIsButtonEnabled(true);
        }



    }, [paths]);


    const handleContinue = () => {
        // dispatch({
        //     type: 'examInfo/setLanguageReadInstructionQuestion',
        //     payload: 1
        // });

        dispatch(progressActions.actions.setTotalProgress(0));

        console.log(paths);
        navigation.navigate("ResultsScreen");
    };

    const onTouchHandler = () => {

        // paths.push(currentPath);
        setPaths((prev) => [...prev, currentPath]);
        console.log(currentPath)
        setCurrentPath([]);
        setClearButtonClicked(false);

    };

    const onTouchMove = (event) => {
        const newPath = [...currentPath];
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;

        const newPoint = `${newPath.length === 0 ? 'M': 'L'}${locationX.toFixed(0)},${locationY.toFixed(0)}`
        newPath.push(newPoint)
        setCurrentPath(newPath);


    };


    const handleClearButtonClick = () => {
        setPaths([]);
        setClearButtonClicked(true);
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.questionContainer}>
                <QuestionTitle text='Dibuje la figura que vio anteriormente' />
                <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchHandler}>
                    <Svg>
                        <Path
                            d={paths.join(' ')}
                            stroke={isClearButtonClicked ? 'transparent' : 'black'}
                            fill="transparent"
                            strokeWidth={8}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                        {paths.map((item, index) => (
                            <Path
                                key={`path-${index}`}
                                d={currentPath.join(' ')}
                                stroke={isClearButtonClicked ? 'transparent' : 'black'}
                                fill="transparent"
                                strokeWidth={8}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                        ))}
                    </Svg>
                </View>
                {isButtonEnabled && <SecondaryButton text="Siguiente" action={() => handleContinue} ></SecondaryButton>}
            </View>
        </View>
    );
}
