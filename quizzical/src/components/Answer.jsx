export default function Answer(props) {
    const {answers, correctAnswer, selectedAnswers, handleAnswerClick, questionIndex, isSolution} = props 
    return answers.map((answer, i)=> {
        return (   
            <li key={i}>
                <input 
                    id={`question-${questionIndex}-option-${i + 1}`} 
                    className="answer-radio" 
                    type="radio" 
                    value={answer}
                    name={`question-${questionIndex}`}
                    checked={selectedAnswers[`answer${questionIndex}`] === answer}
                    onChange={(e)=> handleAnswerClick(e, questionIndex, correctAnswer)}
                    disabled={isSolution}
                 />
                <label htmlFor={`question-${questionIndex}-option-${i + 1}`} className="answer-label">{answer}</label>
            </li>
        )
    })
}