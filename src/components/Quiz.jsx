import { useState, useCallback } from "react"
import QUESTIONS from "../questions.js"
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  const activeQuestionIndex = userAnswers.length 

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  //using call back to stop the function being re-created every time the Quiz state is updated
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((previousUserAnswers) => {
      return [...previousUserAnswers, selectedAnswer];
    })
  }, [])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if (quizIsComplete) {
    return (
       <Summary userAnswers={userAnswers}/>
    )
  }

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