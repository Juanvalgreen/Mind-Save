import { BASE_URL } from "../constants/API";



console.log('BASE_URL:', BASE_URL);

export const postNewExam = async (dataToSend: any) => {
    try {
        const response = await fetch(`${BASE_URL}/exams`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        const data = await response.json();
        console.log('Exam successfully created:', data);
    } catch (e) {
        console.log('Error creating exam:', e);
    }

}