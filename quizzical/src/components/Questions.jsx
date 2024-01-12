import { useEffect, useState } from "react";
import Answers from "./Answer";
import Result from "./Result";

export default function Questions(props) {
    const {questions, setIsHomePage, selectedOption} = props
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
        
    function shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i));
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
                    <fieldset key={i}>
                        <legend>{question}</legend>  
                        <Answers 
                            answers={answers}
                            correctAnswer={correctAnswer} 
                            selectedAnswers={selectedAnswers}
                            handleAnswerClick={handleAnswerClick}
                            questionIndex={i + 1}
                            isSolution={isSolution}
                        />
                    </fieldset>
                )
            })
        }
    }

    function endQuiz(e) {
        e.preventDefault()
        setIsResult(true)
    }

    function gotoHomePage() {
        setIsHomePage(true)
    }

    function showSolution() {
        setIsResult(false)
        setIsSolution(true)
    }

    const quizCategory = selectedOption.category === 'Category' ? 'Random'  : selectedOption.category
    const quizDifficulty = selectedOption.difficulty === 'Difficulty' ? 'Random'  : selectedOption.difficulty
    const quizType = selectedOption.type === 'Type' ? 'Random'  : selectedOption.type

    return (
        <>
            {isResult ? 
                <Result score={score} gotoHomePage={gotoHomePage} showSolution={showSolution} /> 
            :   
                <div>
                    <section>
                        <h2>Quiz</h2>
                        <div>
                            <p>Category: {quizCategory}</p>
                            <p>Difficulty: {quizDifficulty}</p>
                            <p>Type: {quizType}</p>
                        </div>
                    </section>
                    <form className="questions-cntr" onSubmit={endQuiz}>
                        <Question />
                            {isSolution ?
                                <div>
                                    <p>{score}/5</p>
                                    <button type="button" onClick={gotoHomePage}>Try Again</button>
                                </div>
                            :   <button className="end-quiz-btn" type="submit">End Quiz</button>
                            }
                    </form>
                </div>
            }
        </>
    )
}