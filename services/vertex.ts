import { BASE_URL } from "../constants/API";



console.log('BASE_URL:', BASE_URL);

export const handUpValidate = async (dataToSend: any) => {
    const requestBody = {imageInput: dataToSend};
    try {
        console.log('Iniciando fetch...');
        const response = await fetch(`${BASE_URL}/vertex/handVerification`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody) 

        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log('Error validating the data', e);
    }

}


export const eyesValidate = async (dataToSend: any) => {
    const requestBody = {imageInput: dataToSend};
    try {
        console.log('Iniciando fetch...');
        const response = await fetch(`${BASE_URL}/vertex/eyesVerification`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody) 
        });

        const data = await response.json();
        return data;
    } catch (e) {
        console.log('Error validating the data', e);
    }
    console.log('entra en la petición');


}


export const sentenceValidate = async (dataToSend: any) => {
    const requestBody = {sentence: dataToSend};
    try {
        console.log('Iniciando fetch...');
        const response = await fetch(`${BASE_URL}/vertex/sentenceVerification`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody) 
        });

        const data = await response.json();
        return data;
    } catch (e) {
        console.log('Error validating the data', e);
    }
    console.log('entra en la petición');


}