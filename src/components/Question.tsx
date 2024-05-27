import { useContext, useEffect, useState } from "react";
import {decode} from 'html-entities';
import Answers from "./Answers";
import { appContext } from "../App";
import { TAppContext } from "../types/appTypes";
import { TQuestion, TQuestionsToRender } from "../types/quizTypes";

export default function Question(): JSX.Element[] | undefined {
    const { isDarkTheme, questions } = useContext(appContext) as TAppContext

    // STORES AN ARRAY OF OBJECTS THAT CONTAIN THE QUIZ QUESTION, SHUFFLED ANSWERS AND CORRECT ANSWER
    const [questionsToRender, setQuestionsToRender] = useState<TQuestionsToRender>(()=> {
        return questions.map((questionObj: TQuestion)=> {
            const {correct_answer, incorrect_answers, question} = questionObj
            const allAnswers: string[] = [correct_answer, ...incorrect_answers]
            const shuffledAnswers: string[] = shuffleAnswers([...allAnswers])
            return {
                question: question,
                answers: shuffledAnswers,
                correctAnswer: correct_answer
            }
        })
    })

    // SHUFFLES ANSWERS TO ENSURE THAT THE CORRECT ANSWER DOES NOT REMAIN IN THE SAME POSITION FOR EVERY QUESTION
    function shuffleAnswers(answers: string[]): string[] {
        for (let i = answers.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
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

    // RETURNS A FIELDSET WITH A QUESTION AND ITS ASSOCIATED ANSWERS
    if(questionsToRender.length > 0) {
        const questions: JSX.Element[] = questionsToRender.map((questionToRender, i)=> {
            const {question, answers, correctAnswer} = questionToRender
            return (
                <fieldset className="question-fieldset" key={i}>
                    <div className="question"><span>{`${i + 1}).`}</span><h4 className={`${isDarkTheme && 'quiz-form-dark'}`}>{question}</h4></div>  
                    <Answers 
                        answers={answers}
                        correctAnswer={correctAnswer}
                        questionIndex={i + 1}
                    />
                </fieldset>
            )
        })
        return questions
    }
}