import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        //for react router donot add width
    },
    dialogstyle: {
        padding: 30
    },
    buttonstyle: {
        '&:hover': {
            backgroundColor: '#303f9f'
        }
    }
});

const Quiz = ({singleQuestion,answers,correctAnswer,handleNext,handleClick,correct,questionNo,openDialogbox,correctPercentage,setWaiting,setIsLoading,setQuestionNo,setCorrect,setOpenDialogbox}) => {

    const classes = styles();

    return (
        <div className={classes.container}>
            <Card className={classes.root} elevation={5}>
                <Typography style={{width: '90%',textAlign: 'right',marginTop: '20px',color: 'green'}}>Correct: {correct}/{questionNo}</Typography>
                <h2  style={{width: '80%',marginTop: '20px',marginBottom: '20px',fontFamily: 'arial'}} dangerouslySetInnerHTML={{__html: singleQuestion}} />
                {answers.map((answer,index) => {
                    return  <button className={classes.buttonstyle} key={index} style={{width: '80%',marginTop:'8px',marginBottom: '8px',padding: '10px',backgroundColor: '#3f51b5',border: 'none',color: 'white'}} variant='contained' color='primary' onClick={() => handleClick(answer === correctAnswer)} dangerouslySetInnerHTML={{__html: answer}} />
                })}
                <div style={{width: '80%',marginTop: '20px',marginBottom: '20px'}}>
                    <Button variant='contained' color='secondary' style={{width:'50%',float: 'right'}} onClick={handleNext} >Next Question</Button>
                </div>
            </Card>
            <Dialog open={openDialogbox} className={classes.dialogstyle}>
                <DialogContent>
                <Typography variant="h4" style={{fontWeight: 'bold',marginTop: '10px'}}>Congrats!</Typography>
                <Typography variant="h6" style={{color: 'gray',marginTop: '10px',marginBottom: '10px'}}>You answered {correctPercentage}% questions correctly</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color="primary"  style={{width: '200px',marginBottom: '10px'}} onClick={() =>{
                        setWaiting(true)
                        setIsLoading(true);
                        setQuestionNo(0);
                        setCorrect(0);
                        setOpenDialogbox(false);
                    }} >Give another try</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Quiz
