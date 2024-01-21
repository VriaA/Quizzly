import { useEffect, useState } from "react"

export default function QuizDetails(props) {
    const {loading, isResult, setIsResult, isSolution, isDarkTheme, selectedOption} = props
    const [timeLeft, setTimeLeft] = useState(90)
    const [timeSpent, setTimeSpent] = useState({secondsSpent: "00", minutesSpent: "00"})

    useEffect(()=>{
        const updateTimeLeft = setInterval(_=> {
            if(!loading && !isResult && !isSolution) {
                setTimeLeft(prevTimeLeft=> prevTimeLeft - 1)
                updateTimeSpent()   
            }
        }, 1000)
        return ()=> clearInterval(updateTimeLeft)
    }, [loading, isResult, isSolution])

    useEffect(()=> {
        const countdown = document.getElementById('countdown')
        countdown.value = timeLeft
        if(timeLeft <= 0) {
            setIsResult(true)
        }
    }, [timeLeft])

    function updateTimeSpent() {
        setTimeSpent((prevTime) => {
            let newSeconds = Number(prevTime.secondsSpent) + 1
            let newMinutes = Number(prevTime.minutesSpent)

            if (newSeconds === 60) {
                newMinutes += 1
                newSeconds = 0
            }
    
            return {
                    secondsSpent: newSeconds < 10 ? `0${newSeconds}` : newSeconds,
                    minutesSpent: newMinutes < 10 ? `0${newMinutes}` : newMinutes
                }
        })
    }

    const {category, difficulty, type} = selectedOption
    const preferredCategory = category === 'Category' ? 'Any Category' : category
    const preferredDifficulty = difficulty === 'Difficulty' ? 'Any Difficulty' : difficulty
    const preferredType = type === 'Type' ? 'Any Type' : type
    return (
        <section className="quiz-details">
            <h2>{preferredCategory}</h2>
            <div className="quiz-details-inner">
                {isSolution ? 
                    <p className={`time-spent ${isDarkTheme && 'time-spent-dark'}`}>Time spent {`${timeSpent.minutesSpent} :${timeSpent.secondsSpent}`}</p> :
                    <progress id="countdown" className={`countdown ${isDarkTheme && 'countdown-dark'}`} value={90} min={0} max={90}>80</progress>
                }
                <p className="preferred-difficulty-and-type"><span>{preferredDifficulty}</span>|<span>{preferredType}</span></p>
            </div>
        </section>
    )
}