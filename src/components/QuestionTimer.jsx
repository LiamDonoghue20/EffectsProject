import {useState, useEffect} from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }){
    //state to re-render the timer everytime the remaining time is updated
    const [remaingTime, setRemaingTime] = useState(timeout);
    //sets the length of the timeout and the function which is called upon timing out on an answer
    //which is handleSkippedAnswer, passed to the component as onTimeout
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            //clear it out to refresh the timer every time it runs out
            clearTimeout(timer);
        }
    }, [timeout, onTimeout])

    useEffect(() => {
        //update the remainingTime to be -100 every 100 miliseconds
        const interval = setInterval( () => {
            setRemaingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);
        //clear the interval at the end to stop any bugs appearing 
        return () => {
            clearInterval(interval);
        };
    }, [])



    return <progress id="question-time" max={timeout} value={remaingTime} className={mode} />
}