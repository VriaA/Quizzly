export default function Answer(props) {
    const {answers, correctAnswer, selectedAnswers, handleAnswerClick, questionIndex, isSolution, isResult, isDarkTheme} = props 

    function styleAnswerInSolution(isSelected, isCorrect) {
        if (isSolution && isSelected && !isCorrect) {
            return 'wrong-answer'
        } else if (isSolution && isCorrect) {
            return 'right-answer'
        }
    }

    return answers.map((answer, i)=> {
        const isSelected = selectedAnswers[`question${questionIndex}`] === answer
        const isCorrect = answer === correctAnswer
        return (   
                <label 
                    key={i} 
                    htmlFor={`question-${questionIndex}-option-${i + 1}`} 
                    className={`answer-label ${isDarkTheme && 'form-dark'} ${styleAnswerInSolution(isSelected, isCorrect)}`}>
                    <input
                        id={`question-${questionIndex}-option-${i + 1}`} 
                        className="answer-radio" 
                        type="radio" 
                        value={answer}
                        name={`question${questionIndex}`}
                        checked={isSelected}
                        onChange={(e)=> handleAnswerClick(e, questionIndex, correctAnswer, `question${questionIndex}`)}
                        disabled={isSolution || isResult}
                    />
                    {answer}
                </label>
        )
    })
}