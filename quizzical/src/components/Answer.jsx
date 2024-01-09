import { useEffect, useState } from "react"

export default function Answers(props) {
    const {answers, correctAnswer, selectedAnswers, handleAnswerClick, index} = props 

    return answers.map((answer, i)=> {
        return (   
            <li key={i}>
                <input 
                    id={answer} 
                    className="answer-radio" 
                    type="radio" 
                    value={answer}
                    name={`question-${index}`}
                    checked={selectedAnswers[`answer${i + 1}`] === answer}
                    onChange={(e)=> handleAnswerClick(e, (i + 1))}
                 />
                <label htmlFor={answer} className="answer-label">{answer}</label>
            </li>
        )
    })
}