import { useEffect, useState } from "react";
import Answers from "./Answer";

export default function Questions(props) {
    const {questions} = props
    const [score, setScore] = useState(()=> 0)
    const [selectedAnswers, setselectedAnswers] = useState({
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
        answer5: null,
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

    function handleAnswerClick(e, index, correctAnswer) {
        const answer = e.target.value
        setselectedAnswers(prev=> {
            return{...prev, [`answer${index}`]: answer}
        })
    }

    function Question() {
        if(questionsToRender.length > 0) {
        return questionsToRender.map((questionToRender, i)=> {
                const {question, answers, correctAnswer} = questionToRender
                return (
                    <section key={i}>
                        <h4>{question}</h4>  
                        <ul>
                            <Answers 
                            answers={answers}
                            correctAnswer={correctAnswer} 
                            selectedAnswers={selectedAnswers}
                            handleAnswerClick={handleAnswerClick}
                            questionIndex={i + 1}
                        />
                        </ul>
                    </section>
                )
            })
        }
    }

    return (
        <div className="questions-cntr">
            <Question />
        </div>
    )
}