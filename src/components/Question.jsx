import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Question ({questionIndex, onSelectAnswer, onSkipAnswer}) {
    //state to re-render the component when an answer is selected
    const [answer, setAnswer]= useState({
        selectedAnswer: '',
        isCorrect: null
    });
    //the timer will run a default of 10000
    let timer = 10000;
    //reduce the time to 1000 if an answer has been selected
    if(answer.selectedAnswer) {
        timer = 1000;
    }


    //called everytime an answer is clicked
    function handleSelecteAnswer(answer){
        
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })
        //setTimeout is used to give the user sometime to see if the answer was correct or wrong before 
        //storing the answer and moving onto the next question
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                //check if the answer is correct by seeing if its the first entry for the question in the
                //QUESTIONS data
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            })


            setTimeout(() => {
                //pass the answer selected on the Question component back to the Quiz component
                //via the onSelectAnswer prop function passed to this component
                onSelectAnswer(answer)
            }, 2000)
            console.log("timer")
        }, 1000)
        
    }
    //to define the styling on the answer which will update when its defined as correct or incorrect
    let answerState = ''

    if(answer.selectedAnswer && answer.isCorrect !== null ){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer){
        answerState = 'answered'
    }
    
    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer  === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <Answers 
                answers={QUESTIONS[questionIndex].answers} 
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelecteAnswer}
            />
        </div>
    )
}