import React from 'react';

const useFetch = (noOfQuestions,field,difficultyLevel,setWaiting) => {

    const[questions,setQuestions] = React.useState([]);

    const[isLoading,setIsLoading] = React.useState(true);

    const[error,setError] = React.useState(false);

    const Data = async () => {
        try {
            const mainUrl = `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${field}&difficulty=${difficultyLevel}&type=multiple`;
            const response = await fetch(mainUrl);
            const result = await response.json();
            if(result) {
                if(result.results.length > 0){
                    setQuestions(result.results);
                    setIsLoading(false);
                    setError(false);
                } else {
                    setWaiting(true);
                    setError(true);
                }
            } else {
                    setWaiting(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

        if(!isLoading) {
            return { isLoading, questions, Data, setIsLoading, error}
        } else {
            return  { isLoading, Data, setIsLoading, error}
        }
}

export default useFetch
