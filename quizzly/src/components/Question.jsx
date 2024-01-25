import { useEffect, useState } from "react";
import {decode} from 'html-entities';
import Answers from "./Answer";

export default function Question(props) {
    const {selectedAnswers, setselectedAnswers, updateScore, questions, isDarkTheme, isSolution, isResult} = props

    // STORES AN ARRAY OF OBJECTS THAT CONTAIN THE QUIZ QUESTION, SHUFFLED ANSWERS AND CORRECT ANSWER
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

    // SHUFFLES ANSWERS TO ENSURE THAT THE CORRECT ANSWER DOES NOT REMAIN IN THE SAME POSITION FOR EVERY QUESTION
    function shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers
    }

    // DECODES HTML ENTITIES IN QUESTIONS AND ANSWERS TO SPECIAL CHARACTERS
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

    // STORES THE SELECTED ANSWER IN THE 'selectedAnswers' STATE, THEN UPDATES THE USER'S SCORE 
    function selectAnswer(e, questionIndex, correctAnswer) {
        const {name, value} = e.target 

        if(selectedAnswers[name] === value) return /* PREVENTS THE SELECTION OF AN ALREADY SELECTED ANSWER */
            setselectedAnswers(prev=> {
                return{...prev, [name]: value}
            })
            updateScore(value, correctAnswer, questionIndex)
    }

    // RETURNS A FIELDSET WITH A QUESTION AND ITS ASSOCIATED ANSWERS
    if(questionsToRender.length > 0) {
    return questionsToRender.map((questionToRender, i)=> {
            const {question, answers, correctAnswer} = questionToRender
            return (
                <fieldset className="question-fieldset" key={i}>
                    <div className="question"><span>{`${i + 1}).`}</span><h4 className={`${isDarkTheme && 'quiz-form-dark'}`}>{question}</h4></div>  
                    <Answers 
                        answers={answers}
                        correctAnswer={correctAnswer} 
                        selectedAnswers={selectedAnswers}
                        selectAnswer={selectAnswer}
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