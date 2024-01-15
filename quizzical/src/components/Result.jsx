import Confetti from 'react-confetti'
import trophy from '../assets/trophy.png'
import medal from '../assets/medal.png'
import thumbsUp from '../assets/thumbs_up.png'
import crying from '../assets/crying_emoji.png'
import celebration from '../assets/celebration.mp3'

export default function Result(props) {
    const {score, gotoHomePage, showSolution} = props
    const resultMessage = score > 4 ? 'Amazing! You got a perfect Score!' : score > 3 ? 'You did great!' : score > 0 ? 'Well done!' : 'You can do better.'
    const width = window.innerWidth
    const height = window.innerHeight

    return (
        <div className="result-cntr">
            {score === 5 && <Confetti width={width} height={height} gravity={.3}/>}
            { score === 5 &&
                <audio autoPlay={true} loop>
                    <source src={celebration} type='audio/mp3' />
                </audio>
            }
            <section className="result">
                <div className="result-message-cntr">
                    <h2 className="result-message">{resultMessage}</h2>
                    <div className="result-img-cntr">
                        <img className="result-img" src={score === 5 ? trophy : score > 3 ? medal :  score > 0 ? thumbsUp : crying} />
                    </div>
                </div>
                <p className="result-score">{score}/5</p>
                <div className="result-btns">
                    <button className="result-btn" type="button" onClick={gotoHomePage}>Try Again</button>
                    <button className="result-btn" type="button" onClick={showSolution}>Solution</button>
                </div>
            </section>
        </div>
    )
}