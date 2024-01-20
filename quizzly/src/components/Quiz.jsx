import { useEffect, useState } from "react";
import Answers from "./Answer";
import Result from "./Result";
import {decode} from 'html-entities';

export default function Questions(props) {
    const {questions, setIsHomePage, theme, setDialog, setLoading} = props
    const [isResult, setIsResult] = useState(false)
    const [isSolution, setIsSolution] = useState(false)
    const [score, setScore] = useState(()=> 0)
    const [checkedBtnGroupName, setCheckedBtnGroupName] = useState(null)
    const [selectedAnswers, setselectedAnswers] = useState({
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
    })
    const isDarkTheme = theme === 'dark'

    const [questionsToRender, setQuestionsToRender] = useState(()=> {
        return questions.map((questionObj)=> {
            const {correct_answer, incorrect_answers, question} = questionObj
            const allAnswers = [correct_answer, ...incorrect_answers]
            const shuffledAnswers = shuffleAnswers([...allAnswers])
            return {
                question: question,
                answers: shuffledAnswers,
                correctAnswer: correct_answer
            }
        })
    })

    useEffect(()=>{
        setQuestionsToRender(prevQuestions=> {
            return [...prevQuestions].map((questionObj)=> {
                const decodedQuestion = decode(questionObj.question)
                const decodedAnswers = questionObj.answers.map(answer=> decode(answer))
                const decodedCorrectAnswer = decode(questionObj.correctAnswer)

                return {
                    question: decodedQuestion,
                    answers: decodedAnswers,
                    correctAnswer: decodedCorrectAnswer
                }
            })
            
        })
    }, [])

    function shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers
    }

    function handleAnswerClick(e, questionIndex, correctAnswer, answerName) {
        const {name, value} = e.target 

        setselectedAnswers(prev=> {
            return{...prev, [name]: value}
        })
        updateScore(value, correctAnswer, questionIndex)
        setCheckedBtnGroupName(answerName)
    }

    useEffect(()=> {
        if(checkedBtnGroupName) {
            const groupRadioBtns = document.querySelectorAll(`input[name=${checkedBtnGroupName}]`)
            groupRadioBtns.forEach(radio=> {
                if(radio.checked === true) {
                    radio.focus()
                }
            })
        }
    }, [setselectedAnswers, updateScore])

    function updateScore(answer, correctAnswer, index) {
        const isAlreadySelected = selectedAnswers[`question${index}`]
        const isSelectedCorrectAnswer = isAlreadySelected === correctAnswer
        if(isAlreadySelected) {
            answer === correctAnswer ? addAPoint() : removeAPoint(isSelectedCorrectAnswer)
        } else if((!isAlreadySelected) && (answer === correctAnswer)) {
            addAPoint()
        }
    }

    function addAPoint() {
        setScore(prevScore=> prevScore + 1)
    }

    function removeAPoint(isSelectedCorrectAnswer) {
        if(isSelectedCorrectAnswer) {
            setScore(prevScore=> prevScore - 1)
        }
    }

    function Question() {
        if(questionsToRender.length > 0) {
        return questionsToRender.map((questionToRender, i)=> {
                const {question, answers, correctAnswer} = questionToRender
                return (
                    <fieldset className="question-fieldset" key={i}>
                        <p className="question"><span>{`${i + 1}).`}</span><span className={`${isDarkTheme && 'quiz-form-dark'}`}>{question}</span></p>  
                        <Answers 
                            answers={answers}
                            correctAnswer={correctAnswer} 
                            selectedAnswers={selectedAnswers}
                            handleAnswerClick={handleAnswerClick}
                            questionIndex={i + 1}
                            isSolution={isSolution}
                            isResult={isResult}
                            isDarkTheme={isDarkTheme}
                        />
                    </fieldset>
                )
            })
        }
    }

    function endQuiz(e) {
        e.preventDefault()
        const selectedAnswersArr = Object.values(selectedAnswers)
        
        if(selectedAnswersArr.includes(null)) {
            setDialog( {['textContent']: 'Please answer all questions.', ['isOpen']: true} )
        } else {
            setIsResult(true)
        }
    }

    function gotoHomePage() {
        setLoading(true)
        setIsHomePage(true)
    }

    function showSolution() {
        setIsResult(false)
        setIsSolution(true)
    }

    const gradientStyles = {
        backgroundSize: isDarkTheme ? '70%' : 'cover',
    } 
    return ( 
            <div className="quiz-wrapper">
                <form className="quiz-form" onSubmit={endQuiz}>
                    <section className="quiz-preferences">
                        <h2>Science: Computers</h2>
                        <div className="quiz-preferences-inner">
                            <progress className={`countdown ${isDarkTheme && 'countdown-dark'}`} value={10} min={0} max={90}>80</progress>
                            <p className="preferred-difficulty-and-type"><span>Any category</span>|<span>Any type</span></p>
                        </div>
                    </section>
                    <Question />
                        {isSolution ?
                            <div className="solution-score-cntr">
                                <p className={`solution-score ${isDarkTheme && 'solution-score-dark'}`}>Your score: {score}/5</p>
                                <button className="try-again-btn" type="button" onClick={gotoHomePage}>Try Again</button>
                            </div>
                        :   <button className="end-quiz-btn" type="submit">End Quiz</button>
                        }
                </form>

                {isResult && <Result score={score} gotoHomePage={gotoHomePage} showSolution={showSolution} isDarkTheme={theme === 'dark'} /> }
                <div className="gradient gradient-quiz" style={gradientStyles}></div>
            </div>
    )
}