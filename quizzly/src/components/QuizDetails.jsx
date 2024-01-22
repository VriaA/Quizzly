import { useEffect, useState } from "react"
import beepSoundEffect from '../assets/music/beep_beep.mp3'

export default function QuizDetails(props) {
    const beepSound = new Audio(beepSoundEffect)
    const {loading, isResult, setIsResult, isSolution, isDarkTheme, selectedOption} = props
    const [timeLeft, setTimeLeft] = useState(90)
    const [timeSpent, setTimeSpent] = useState({secondsSpent: "00", minutesSpent: "00"})
    const [isTimeUp, setIsTimeUp] = useState(false)    
    useEffect(()=>{
        const updateTimeLeft = setInterval(_=> {
            if(!loading && !isResult && !isSolution && !isTimeUp) {
                setTimeLeft(prevTimeLeft=> prevTimeLeft - 1)
                updateTimeSpent()   
            }
        }, 1000)
        return ()=> clearInterval(updateTimeLeft)
    }, [loading, isResult, isSolution, isTimeUp])

    useEffect(()=> {
        const countdown = document.getElementById('countdown')
        if(!countdown) return
        countdown.value = timeLeft
        if(timeLeft <= 0) {
            setIsTimeUp(true)
            beepSound.play()
        }
    }, [timeLeft])

    useEffect(()=> {
        if(isTimeUp) {
            setTimeout(()=> {
                setIsResult(true)
                beepSound.currentTime = 0
            }, 2500)
        }
    }, [isTimeUp])

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
    const isTimeUpMessageVisible = isTimeUp && !isSolution && !isResult
    return (
        <section className="quiz-details">
            <h2>{preferredCategory}</h2>
            <div className="quiz-details-inner">
                {isSolution ? 
                    <p className={`time-spent ${isDarkTheme && 'time-spent-dark'}`}>Time spent {`${timeSpent.minutesSpent}:${timeSpent.secondsSpent}`}</p> :
                    <progress id="countdown" className={`countdown ${isDarkTheme && 'countdown-dark'}`} value={90} min={0} max={90}>80</progress>
                }
                <p className="preferred-difficulty-and-type"><span>{preferredDifficulty}</span> | <span>{preferredType}</span></p>
                <p className={`time-up-message ${isTimeUpMessageVisible && 'show-time-up-message'} ${isDarkTheme && 'time-up-message-dark'}`}>Time's up!</p>
                <p className="sr-only" aria-live="assertive">{isTimeUp && "Time's up!"}</p>
            </div>
        </section>
    )
}