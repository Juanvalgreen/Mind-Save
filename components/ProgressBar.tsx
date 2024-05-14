import { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress'
import { useSelector } from 'react-redux';
import { GlobalState } from '../types/types';
import { Text, StyleSheet, View } from 'react-native';


const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',  
      backgroundColor: '#092C4C',
      paddingBottom: 16
    },
    belowText: {
        marginTop: 12,
        color: 'white'
    },
    aboveText: {
        marginBottom: 12,
        color: 'white'
    }
});

export default function ProgressBar(){


    const [numberProgress,setNumberProgress]= useState<number>(1);
    const globalProgress = useSelector((state: GlobalState) => state.totalProgress);
    const globalExamSection = useSelector((state: GlobalState) => state.examSection);



    useEffect(()=>{
        setNumberProgress((prev) => prev + 1);

    },[globalProgress])

    


    return(
        <View style={styles.container}>
            <Text style={styles.aboveText}>{globalExamSection}</Text>

            <Progress.Bar progress={globalProgress} width={350} color='#007759' unfilledColor='white'/>

            <Text style={styles.belowText}> {numberProgress} de 30</Text>

        
        </View>
    )
}