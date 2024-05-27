import { useContext, KeyboardEvent } from "react"
import { appContext } from "../App"
import { quizContext } from "./Quiz"
import { TquizContext, TAnswersProp, TSelectAnswer } from "../types/quizTypes"
import { TAppContext } from "../types/appTypes"

export default function Answers({answers, correctAnswer, questionIndex}: TAnswersProp): JSX.Element[] {

    const { isDarkTheme } = useContext(appContext) as TAppContext
    const { isResult, isSolution, selectedAnswers, setSelectedAnswers, updateScore} = useContext(quizContext) as TquizContext
    /*RETURNS A CLASS FOR STYLING AN ANSWER WHEN RENDERING THE QUIZ SOLUTION, BASED ON 
    WHETHER THE ANSWER IS CORRECT OR NOT */
    function styleAnswerInSolution(isSelected: boolean, isCorrect: boolean): string | undefined {
        if (isSolution && isSelected && !isCorrect) {
            return ' wrong-answer'
        } else if (isSolution && isCorrect) {
            return ' right-answer'
        }
    }

    // STORES THE SELECTED ANSWER IN THE 'selectedAnswers' STATE, THEN UPDATES THE USER'S SCORE 
    const selectAnswer: TSelectAnswer = (e, questionIndex, correctAnswer): void => {
        const {name, value} = e.target as HTMLInputElement

        if(selectedAnswers[name as keyof typeof selectedAnswers] === value) return /* PREVENTS THE SELECTION OF AN ALREADY SELECTED ANSWER */
            setSelectedAnswers(prev=> {
                return{...prev, [name]: value}
            })
            updateScore(value, correctAnswer, questionIndex)
    }

    // ALLOWS USERS TO SELECT AN ANSWER BY PRESSING THE ENTER KEY WITHOUT SUBMITTING THE QUIZ.
    function selectAnswerOnEnter(e: KeyboardEvent, questionIndex: number, correctAnswer: string): void {
        if(!isSolution && e.key === 'Enter') {
            e.preventDefault()
            selectAnswer(e, questionIndex, correctAnswer)
        }
    }

    const isRadioDisabled = isSolution || isResult
    return answers.map((answer, i)=> {
        const isSelected = selectedAnswers[`question${questionIndex}` as keyof typeof selectedAnswers] === answer
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
                        onChange={(e)=> selectAnswer(e, questionIndex, correctAnswer)}
                        onKeyDown={(e)=> selectAnswerOnEnter(e, questionIndex, correctAnswer)}
                        disabled={isRadioDisabled}
                    />
                    {answer}
                </label>
        )
    })
}