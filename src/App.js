import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MenuItem, Select, TextField } from '@material-ui/core';
import useFetch from './useFetch';
import Quiz from './quiz';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '90%',
        [theme.breakpoints.up('md')]: {
            width: '60%'
        }
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    childstyle: {
        width: '80%'
    },
    hoverstyle: {
        '&:hover': {
            backgroundColor: '#3f51b5'
        }
    }
}))

const App = () => {

    const classes = styles();

    const[field,setField] = React.useState(23);

    const[difficulty,setDifficulty] = React.useState('easy');

    const[noOfQuestions,setNoOfQuestions] = React.useState(10);

    const[waiting,setWaiting] = React.useState(true);

    const[questionNo,setQuestionNo] = React.useState(0);

    const[correct,setCorrect] = React.useState(0);

    const [openDialogbox,setOpenDialogbox] = React.useState(false);

    const[correctPercentage,setCorrectPercentage] = React.useState(0);

    const { questions, isLoading, Data, setIsLoading, error } = useFetch(noOfQuestions, field, difficulty,setWaiting);

    let answers;
    let singleQuestion;
    let correctAnswer;
     
    if(questions){
    const {question,incorrect_answers,correct_answer} = questions[questionNo];
        singleQuestion = question;
        correctAnswer = correct_answer;
        answers = [...incorrect_answers];
        const index = Math.floor(Math.random() * 4);
        if(index === 3) {
            answers.push(correct_answer);
        } else {
           answers.push(answers[index])
           answers[index] = correct_answer;
        }

    }

    const handleChange1 = (e) => {
        setField(e.target.value);
    }

    const handleChange2 = (e) => {
        setDifficulty(e.target.value);
    }

    const handleChange3 = (e) => {
        setNoOfQuestions(e.target.value)
    }

    const handleSubmit = () => {
        setWaiting(false);
        Data(); 
    }

    const handleNext = () => {
        if(questionNo >= questions.length - 1) {
            setOpenDialogbox(true);
            setCorrectPercentage(Math.floor( correct/questionNo * 100))
            setQuestionNo(0);
        } else {
            setQuestionNo(questionNo + 1);
        }
    }

    const handleClick = (value) => {
        if(value){
            setCorrect(correct + 1);
        }
        handleNext();
    }

    const ListOfProps = {
        singleQuestion,
        answers,
        correctAnswer,
        handleNext,
        handleClick,
        correct,
        questionNo,
        openDialogbox,
        correctPercentage,
        setWaiting,
        setIsLoading,
        setQuestionNo,
        setCorrect,
        setOpenDialogbox
    }

    return (
        <div className={classes.container}>
            {waiting && isLoading && <Card elevation={5} className={classes.root}>
                <Typography variant='h4' style={{marginTop: '30px',width: '80%'}} color='primary'>Quiz</Typography>
                <Typography variant='h6' style={{marginTop: '20px',width: '80%'}}>Number Of Questions</Typography>
                <TextField className={classes.childstyle} defaultValue={noOfQuestions} onChange={handleChange3} />
                <Typography variant='h6' style={{marginTop: '20px',width: '80%'}}>Select Field</Typography>
                <Select className={classes.childstyle} value={field} onChange={handleChange1} >
                    <MenuItem value='23' className={classes.hoverstyle}>History</MenuItem>
                    <MenuItem value='21' className={classes.hoverstyle}>Sports</MenuItem>
                    <MenuItem value='24' className={classes.hoverstyle}>Politics</MenuItem>
                </Select>
                <Typography variant='h6' style={{marginTop: '20px',width: '80%'}}>Select Difficulty</Typography>
                <Select className={classes.childstyle} value={difficulty} onChange={handleChange2} >
                    <MenuItem value='easy' className={classes.hoverstyle}>Easy</MenuItem>
                    <MenuItem value='medium' className={classes.hoverstyle}>Medium</MenuItem>
                    <MenuItem value='hard' className={classes.hoverstyle}>Difficult</MenuItem>
                </Select>
                {error && <Typography style={{color: 'red',width: '80%',marginTop: '10px'}}>Unable To Get Questions.Plz Use Different Search</Typography>}
                <Button variant='contained' className={classes.childstyle} color='primary' style={{marginBottom: '30px',marginTop: '20px'}} onClick={handleSubmit}>Start</Button>
            </Card>}
            {isLoading && !waiting && <Typography variant="h4">Loading...</Typography>}
            {!waiting && !isLoading && <Quiz  {...ListOfProps}/>}
        </div>
    )
}

export default App
