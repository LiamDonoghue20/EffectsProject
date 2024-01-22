import { useState, useCallback } from "react"
import QUESTIONS from "../questions.js"
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  //array to store the users answers
  //state to re-render the quiz every time a use selects an answer
  const [userAnswers, setUserAnswers] = useState([])
  //determine the active question by checking how many questions the user has already answered
  const activeQuestionIndex = userAnswers.length 
  //determine if the quiz is finished by comparing the amount of answers to amount of questions
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  //using call back to stop the function being re-created every time the Quiz state is updated
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((previousUserAnswers) => {
      //adding the selected answer to the userAnswers state along with the previous ones
      return [...previousUserAnswers, selectedAnswer];
    })
  }, [])
  //called if the timer runs out on the question component without selecting an answer
  //sets the answer to the question as Null in the userAnswers array
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
  //if quizIsComplete is true, return the summary component
  if (quizIsComplete) {
    return (
       <Summary userAnswers={userAnswers}/>
    )
  }
  //key passed through the question so the question component is re-rendered
  //everytime the activeQuestionIndex changes value
  return (
    <div id="quiz">
      <Question 
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        
      />
    </div>

  );
}