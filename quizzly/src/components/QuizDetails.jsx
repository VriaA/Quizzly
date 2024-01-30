import { useEffect, useState } from "react"
import beepSoundEffect from '../assets/music/beep_beep.mp3'

export default function QuizDetails(props) {
    const beepSound = new Audio(beepSoundEffect)
    const {loading, isResult, setIsResult, isSolution, isDarkTheme, selectedOption} = props
    const [timeLeft, setTimeLeft] = useState(0)
    const [timeSpent, setTimeSpent] = useState({secondsSpent: "00", minutesSpent: "00"})
    const [isTimeUp, setIsTimeUp] = useState(false)    

    // CHANGES THE POSITION OF THE COUNTDOWN TIMER TO FIXED WHEN THE QUIZ DETAILS SECTION IS AT THE TOP OF THE SCREEN OR NO LONGER IN VIEW.
    useEffect(()=> {
        window.addEventListener('scroll', changeTimerPosition)
        return ()=> window.removeEventListener('scroll', changeTimerPosition)
    }, [isSolution])

    function changeTimerPosition() {
        const countdownWrapper = document.getElementById("countdown-wrapper")
        const quizDetailsRect = document.getElementById("quiz-details").getBoundingClientRect()
        const isAtTop = quizDetailsRect.top <= 0

        if(countdownWrapper && isAtTop && !isSolution) {
            countdownWrapper.classList.add("fixed-countdown")
        } else {
            countdownWrapper.classList.remove("fixed-countdown")
        }
    }

    // KEEPS TRACK OF THE TIME LEFT AND TIME SPENT EVERY SECOND DURING A QUIZ
    useEffect(()=>{
        const updateTimeLeft = setInterval(_=> {
            if(!loading && !isResult && !isSolution && !isTimeUp) {
                setTimeLeft(prevTimeLeft=> prevTimeLeft + 1)
                updateTimeSpent()   
            }
        }, 1000)
        return ()=> clearInterval(updateTimeLeft)
    }, [loading, isResult, isSolution, isTimeUp])

    /*- UPDATES THE COUNTDOWN VALUE.
      - ENDS THE QUIZ WHEN THE TIME IS UP
      - STYLE THE ENDING COUNTDOWN*/
    useEffect(()=> {
        const countdown = document.getElementById('countdown')
        if(!countdown) return
        countdown.value = timeLeft

        endQuizAtTimeUp()
        styleEndingCountdown()
    }, [timeLeft])

    // SETS 'isTimeUp' TO TRUE ONCE THE TIME LEFT FOR A QUIZ IS GREATER THAN OR EQUAL TO 75
    // PLAYS A BEEP SOUND WHEN THE TIME IS UP
    function endQuizAtTimeUp() {
        if(timeLeft >= 75) {
            setIsTimeUp(true)
            beepSound.play()
        }
    }

    function styleEndingCountdown() {
        if(timeLeft >= 65) {
            countdown.classList.add("countdown-ending-soon")
        }
    }

    // SHOWS THE QUIZ RESULTS WHEN THE TIME FOR A QUIZ IS UP BY SETTING 'isResult' TO TRUE
    // REMOVES 'countdown-ending-soon' FROM TIMER COUNTDOWN
    useEffect(()=> {
        const countdown = document.getElementById("countdown")
        if(isTimeUp) {
            setTimeout(()=> {
                setIsResult(true)
                beepSound.currentTime = 0
            }, 2500)
            countdown.classList.remove("countdown-ending-soon")
        }
    }, [isTimeUp])

    /* UPDATES THE TIME SPENT WHEN CALLED
        - INCREASES THE SECONDS SPENT BY ONE
        - INCREASES THE MINUTE SPENT BY ONE IF THE SECONDS SPENT IS 60 */
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

    // USER QUIZ PREFERENCE VALUES
    const {category, difficulty, type} = selectedOption
    const preferredCategory = category === 'Category' ? 'Any Category' : category
    const preferredDifficulty = difficulty === 'Difficulty' ? 'Any Difficulty' : difficulty
    const preferredType = type === 'Type' ? 'Any Type' : type

    // USED TO RENDER A MESSAGE WHEN THE TIME FOR A QUIZ IS UP
    const isTimeUpMessageVisible = isTimeUp && !isSolution && !isResult
    return (
        <section id="quiz-details" className="quiz-details">
            <h2>{preferredCategory}</h2>
            <div className="quiz-details-inner">
                {/* SHOWS THE TIME SPENT IF THE QUIZ SOLUTION IS BEING DISPLAYED.
                    SHOWS THE QUIZ COUNTDOWN TIMER IF THE QUIZ IS STILL ONGOING */}
                <div id="countdown-wrapper" className="countdown-wrapper">
                        <span className="timer-icon material-symbols-outlined">
                            timer
                        </span>
                        { isSolution ? 
                        <p className={`time-spent ${isDarkTheme && 'time-spent-dark'}`}>{`${timeSpent.minutesSpent} : ${timeSpent.secondsSpent}`}</p> 
                        : <progress id="countdown" className={`countdown ${isDarkTheme && 'countdown-dark'}`} value={timeLeft} min={0} max={75}>{timeLeft} seconds</progress>
                        }
                </div>
                
                <div className="preferred-difficulty-and-type"><h3>{preferredDifficulty}</h3> | <h3>{preferredType}</h3></div>
                <p className={`time-up-message ${isTimeUpMessageVisible && 'show-time-up-message'} ${isDarkTheme && 'time-up-message-dark'}`}>Time's up!</p>
                <p className="sr-only" aria-live="assertive">{isTimeUp && "Time's up!"}</p>
            </div>
        </section>
    )
}