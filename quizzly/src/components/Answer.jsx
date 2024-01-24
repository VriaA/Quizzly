export default function Answer(props) {
    const {answers, correctAnswer, selectedAnswers, selectAnswer, questionIndex, isSolution, isResult, isDarkTheme} = props 

    /*RETURNS A CLASS FOR STYLING AN ANSWER WHEN RENDERING THE QUIZ SOLUTION, BASED ON 
    WHETHER THE ANSWER IS CORRECT OR NOT */
    function styleAnswerInSolution(isSelected, isCorrect) {
        if (isSolution && isSelected && !isCorrect) {
            return ' wrong-answer'
        } else if (isSolution && isCorrect) {
            return ' right-answer'
        }
    }

    // ALLOWS USERS TO SELECT AN ANSWER BY PRESSING THE ENTER KEY WITHOUT SUBMITTING THE QUIZ.
    function selectAnswerOnEnter(e) {
        if(!isSolution && e.key === 'Enter') {
            e.preventDefault()
            selectAnswer(e, questionIndex, correctAnswer, `question${questionIndex}`)
        }
    }

    const isRadioDisabled = isSolution || isResult
    return answers.map((answer, i)=> {
        const isSelected = selectedAnswers[`question${questionIndex}`] === answer
        const isCorrect = answer === correctAnswer
        return (   
                <label 
                    key={i} 
                    htmlFor={`question-${questionIndex}-option-${i + 1}`} 
                    className={`answer-label${isDarkTheme ? ' quiz-form-dark' : ''}${isRadioDisabled ? ' disabled-option' : ''}${styleAnswerInSolution(isSelected, isCorrect) || ''}`}>
                    <input
                        id={`question-${questionIndex}-option-${i + 1}`} 
                        className="answer-radio" 
                        type="radio" 
                        value={answer}
                        name={`question${questionIndex}`}
                        checked={isSelected}
                        onChange={(e)=> selectAnswer(e, questionIndex, correctAnswer, `question${questionIndex}`)}
                        onKeyDown={(e)=> selectAnswerOnEnter(e, questionIndex, correctAnswer, `question${questionIndex}`)}
                        disabled={isRadioDisabled}
                    />
                    {answer}
                </label>
        )
    })
}