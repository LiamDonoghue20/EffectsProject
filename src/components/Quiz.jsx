import { useState, useCallback } from "react"
import QUESTIONS from "../questions.js"
import QuestionTimer from "./QuestionTimer.jsx"
import quizCompleteImage from "../assets/quiz-complete.png"

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length;


    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallBack(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((previousUserAnswers) => {
            return [...previousUserAnswers, selectedAnswer];
        })
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImage} alt="Quiz completion image" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }
    //put this code below the quiz completion screen, so it doesnt throw errors trying to generate shuffled answers
    //when there is no active question index
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
        <div id="question">
          <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer}/>
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
}