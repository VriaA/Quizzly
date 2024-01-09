import { useEffect, useState } from "react"

export default function Answers(props) {
    const {answers, correctAnswer, selectedAnswers, handleAnswerClick, questionIndex} = props 
    return answers.map((answer, i)=> {
        return (   
            <li key={i}>
                <input 
                    id={answer} 
                    className="answer-radio" 
                    type="radio" 
                    value={answer}
                    name={`question-${questionIndex}`}
                    checked={selectedAnswers[`answer${questionIndex}`] === answer}
                    onChange={(e)=> handleAnswerClick(e, questionIndex, correctAnswer)}
                 />
                <label htmlFor={answer} className="answer-label">{answer}</label>
            </li>
        )
    })
}