export default function Result(props) {
    const {score, gotoHomePage, showSolution} = props
    const resultMessage = score > 4 ? 'Amazing! You got a perfect Score!' : score > 3 ? 'You did great!' : score > 0 ? 'Well done!' : 'You can do better'

    return (
        <section>
            <h2>{resultMessage}</h2>
            {score === 5 ? <p>🏆</p> : score === 0 ? <p>😢</p> : <p>🏅</p>}
            <p><span>{score}</span>/5</p>
            <button type="button" onClick={gotoHomePage}>Try Again</button>
            <button type="button" onClick={showSolution}>Show Solution</button>
        </section>
    )
}