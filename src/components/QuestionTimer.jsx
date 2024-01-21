import {useState, useEffect} from 'react';

export default function QuestionTimer({ timeout, onTimeout }){

    const [remaingTime, setRemaingTime] = useState(timeout);

    useEffect(() => {
        setTimeout(onTimeout, timeout);
    }, [timeout, onTimeout])

    useEffect(() => {
        setInterval( () => {
            setRemaingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100)
    }, [])



    return <progress id="question-time" max={timeout} value={remaingTime} />
}