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


    // const [barProgress,setBarProgress]= useState<number>(0.2);
    const globalProgress = useSelector((state: GlobalState) => state.totalProgress);



    // useEffect(()=>{
    //     setProgress(globalProgress);

    // },[])

    


    return(
        <View style={styles.container}>
            <Text style={styles.aboveText}>Preguntas Demograficás</Text>

            <Progress.Bar progress={globalProgress} width={350} color='#007759' unfilledColor='white'/>

            <Text style={styles.belowText}>1 de 3</Text>

        
        </View>
    )
}