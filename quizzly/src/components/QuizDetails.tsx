import { useEffect, useRef, useState } from "react"
import beepSoundEffect from '../assets/music/beep_beep.mp3'
import { useContext } from "react"
import { appContext } from "../App"
import { quizContext } from "./Quiz"
import { TquizContext, TTimeSpent } from "../types/quizTypes"
import { TAppContext } from "../types/appTypes"

export default function QuizDetails(): JSX.Element {
    const beepSound: HTMLAudioElement = new Audio(beepSoundEffect)
    const {isResult, isSolution, setIsResult} = useContext(quizContext) as TquizContext
    const { isDarkTheme, loading, selectedOption } = useContext(appContext) as TAppContext
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [timeSpent, setTimeSpent] = useState<TTimeSpent>({secondsSpent: "00", minutesSpent: "00"})
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false)    
    const countdownTimer = useRef<HTMLProgressElement>(null)

    // CHANGES THE POSITION OF THE COUNTDOWN TIMER TO FIXED WHEN THE QUIZ DETAILS SECTION IS AT THE TOP OF THE SCREEN OR NO LONGER IN VIEW.
    useEffect(()=> {
        window.addEventListener('scroll', changeTimerPosition)
        return ()=> window.removeEventListener('scroll', changeTimerPosition)
    }, [isSolution])

    function changeTimerPosition(): void {
        const countdownWrapper = document.getElementById("countdown-wrapper") as HTMLElement
        const quizDetailsRect = (document.getElementById("quiz-details") as HTMLElement).getBoundingClientRect()
        const isAtTop: boolean = quizDetailsRect.top <= 0

        if(countdownWrapper && isAtTop && !isSolution) {
            countdownWrapper.classList.add("fixed-countdown")
        } else {
            countdownWrapper.classList.remove("fixed-countdown")
        }
    }
    
    // KEEPS TRACK OF THE TIME LEFT AND TIME SPENT EVERY SECOND DURING A QUIZ
    useEffect(()=>{
        const updateTimeLeft = setInterval(()=> {
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
        const countdown = countdownTimer.current
        if(!countdown) return
        countdown.value = timeLeft

        endQuizAtTimeUp()
        styleEndingCountdown(countdown)
    }, [timeLeft])

    // SETS 'isTimeUp' TO TRUE ONCE THE TIME LEFT FOR A QUIZ IS GREATER THAN OR EQUAL TO 75
    // PLAYS A BEEP SOUND WHEN THE TIME IS UP
    function endQuizAtTimeUp(): void {
        if(timeLeft >= 75) {
            setIsTimeUp(true)
            beepSound.play()
        }
    }

    function styleEndingCountdown(countdown: HTMLProgressElement): void {
        if(timeLeft >= 65) {
            countdown.classList.add("countdown-ending-soon")
        }
    }

    // SHOWS THE QUIZ RESULTS WHEN THE TIME FOR A QUIZ IS UP BY SETTING 'isResult' TO TRUE
    // REMOVES 'countdown-ending-soon' FROM TIMER COUNTDOWN
    useEffect(()=> {
        if(isTimeUp) {
            const showResultWhenTimeIsUp = setTimeout(()=> {
                setIsResult(true)
                beepSound.currentTime = 0
            }, 2500)
            return ()=> clearTimeout(showResultWhenTimeIsUp)
        }
    }, [isTimeUp])

    /* REMOVE "countdown-ending-soon" CLASS FROM THE COUNTDOWN TIMER WHEN THE
       QUIZ RESULT IS BEING DISPLAYED */
    useEffect(()=> {
        if(!isResult || !countdownTimer.current )return
        countdownTimer.current.classList.remove("countdown-ending-soon")
    }, [isResult])

    /* UPDATES THE TIME SPENT WHEN CALLED
        - INCREASES THE SECONDS SPENT BY ONE
        - INCREASES THE MINUTE SPENT BY ONE IF THE SECONDS SPENT IS 60 */
    function updateTimeSpent(): void {
        setTimeSpent((prevTime) => {
            let newSeconds = Number(prevTime.secondsSpent) + 1
            let newMinutes = Number(prevTime.minutesSpent)

            if (newSeconds === 60) {
                newMinutes += 1
                newSeconds = 0
            }
    
            return {
                    secondsSpent: newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`,
                    minutesSpent: newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`
                }
        })
    }

    // USER QUIZ PREFERENCE VALUES
    const {category, difficulty, type} = selectedOption
    const preferredCategory: string = category === 'Category' ? 'Any Category' : category
    const preferredDifficulty: string = difficulty === 'Difficulty' ? 'Any Difficulty' : difficulty
    const preferredType: string = type === 'Type' ? 'Any Type' : type

    // USED TO RENDER A MESSAGE WHEN THE TIME FOR A QUIZ IS UP
    const isTimeUpMessageVisible: boolean = isTimeUp && !isSolution && !isResult
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
                        : <progress 
                        id="countdown" 
                        className={`countdown ${isDarkTheme && 'countdown-dark'}`} 
                        value={timeLeft} 
                        max={75}
                        ref={countdownTimer}> 
                        {timeLeft} seconds</progress>
                        }
                </div>
                
                <div className="preferred-difficulty-and-type"><h3>{preferredDifficulty}</h3> | <h3>{preferredType}</h3></div>
                <p className={`time-up-message ${isTimeUpMessageVisible && 'show-time-up-message'} ${isDarkTheme && 'time-up-message-dark'}`}>Time's up!</p>
                <p className="sr-only" aria-live="assertive">{isTimeUp && "Time's up!"}</p>
            </div>
        </section>
    )
}