import Confetti from 'react-confetti'
import trophy from '../assets/images/trophy.png'
import medal from '../assets/images/medal.png'
import thumbsUp from '../assets/images/thumbs_up.png'
import crying from '../assets/images/crying_emoji.png'
import celebration from '../assets/music/celebration.mp3'
import fail from '../assets/music/fail.mp3'
import { useContext } from 'react'
import { appContext } from "../App"
import { TAppContext } from '../types/appTypes'
import { quizContext } from './Quiz'
import { TquizContext } from '../types/quizTypes'

export default function Result(): JSX.Element {
    const { isDarkTheme } = useContext(appContext) as TAppContext
    const {score, gotoHomePage, showSolution} = useContext(quizContext) as TquizContext
    const resultMessage: string = score > 4 ? 'Amazing! You got a perfect Score!' : score > 3 ? 'You did great!' : score > 0 ? 'Not bad!' : 'You can do better.'
    
    // CONFETTI CONTAINER SIZE
    const width: number = window.innerWidth
    const height: number = window.innerHeight

    return (
        <div className="result-cntr">
            {/* SHOWS CONFETTI IF A USER SCORES 5 POINTS*/}
            {score === 5 && <Confetti width={width} height={height} gravity={.3}/>}

            {/* PLAYS CELEBRATORY MUSIC IF A USER SCORES 5 POINTS*/}
            { score === 5 &&
                <audio autoPlay={true} loop>
                    <source src={celebration} type='audio/mp3' />
                </audio>
            }

            {/* PLAYS 'fail' MUSIC IF A USER SCORES 0*/}
            { score === 0 &&
                <audio autoPlay={true}>
                    <source src={fail} type='audio/mp3' />
                </audio>
            }
            
            <section className={`result ${isDarkTheme && 'result-dark'}`}>
                <div className="result-message-cntr">
                    <h2 className="result-message">{resultMessage}</h2>
                    <div className={`result-img-cntr ${isDarkTheme && 'result-img-cntr-dark'}`}>
                        <img className="result-img" src={score === 5 ? trophy : score > 3 ? medal :  score > 0 ? thumbsUp : crying} />
                    </div>
                </div>
                <p className="result-score">{score}/5</p>
                <div className="result-btns">
                    <button className="btn-group-1 result-btn" type="button" onClick={gotoHomePage}>Try Again</button>
                    <button className="result-btn result-solution-btn" type="button" onClick={showSolution}>Check Solution</button>
                </div>
            </section>
        </div>
    )
}