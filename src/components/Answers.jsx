import { useRef } from 'react';

export default function Answers ({answers, selectedAnswer, answerState, onSelect}) {

    const shuffledAnswers = useRef();

  //put this code below the quiz completion screen, so it doesnt throw errors trying to generate shuffled answers
  //when there is no active question index
  //also calling the code to shuffle the answers behind an if check,
  //if shuffledAnswers is undefined, then the code will run to define shuffledAnswers
  //meaning the answers will only be shuffled once during the Quiz life cycle
    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            const isSelected = selectedAnswer === answer
            let cssClass = '';
            if (answerState === 'answered' && isSelected) {
              cssClass = 'selected'
            }

            if((answerState === 'correct' || answerState ==='wrong') && isSelected) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState !== ''}>
                  {answer}
                </button>
              </li>
            )
          }

          )}
        </ul>
    );
}