export default function Answer(props) {
    const {answers, correctAnswer, selectedAnswers, handleAnswerClick, questionIndex, isSolution, isDarkTheme} = props 
    return answers.map((answer, i)=> {
        return (   
                <label key={i} htmlFor={`question-${questionIndex}-option-${i + 1}`} className={`answer-label ${isDarkTheme && 'form-dark'}`}>
                    <input
                        id={`question-${questionIndex}-option-${i + 1}`} 
                        className="answer-radio" 
                        type="radio" 
                        value={answer}
                        name={`question${questionIndex}`}
                        checked={selectedAnswers[`question${questionIndex}`] === answer}
                        onChange={(e)=> handleAnswerClick(e, questionIndex, correctAnswer, `question${questionIndex}`)}
                        disabled={isSolution}
                    />
                    {answer}
                </label>
        )
    })
}