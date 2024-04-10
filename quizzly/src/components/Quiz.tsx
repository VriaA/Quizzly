import {useState, useContext, createContext, FormEvent } from "react";
import Result from "./Result";
import QuizDetails from "./QuizDetails";
import Question from "./Question";
import { appContext } from "../App";
import { TAppContext } from "../types/appTypes";
import { TSelectedAnswers, TquizContext } from "../types/quizTypes";

export const quizContext = createContext<TquizContext | null>(null)

export default function Questions() {
    const { isDarkTheme, setLoading, setDialog, setIsHomePage } = useContext(appContext) as TAppContext
    const [isResult, setIsResult] = useState<boolean>(false)
    const [isSolution, setIsSolution] = useState<boolean>(false)
    const [score, setScore] = useState<number>(()=> 0)
    const [selectedAnswers, setSelectedAnswers] = useState<TSelectedAnswers>({
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
    })

    /* UPDATES THE USER'S SCORE WHEN AN ANSWER IS SELECTED FOR A QUIZ QUESTION. 
        IF AN ANSWER HAS ALREADY BEEN SELECTED FOR A PARTICULAR QUESTION BEFORE:
            - A POINT IS ADDED IF THE CURRENT SELECTION IS CORRECT.
                (THE SAME ANSWER CANNOT BE SELECTED TWICE, SO THERE'S NO NEED TO CHECK IF THE PREVIOUS SELECTION WAS CORRECT.)
            - A POINT IS DEDUCTED ONLY IF THE CURRENT SELECTION IS INCORRECT AND THE PREVIOUS ONE WAS CORRECT.
        IF AN ANSWER HAS NOT BEEN SELECTED FOR A QUESTION BEFORE:
            - A POINT IS ADDED IF THE CURRENT SELECTION IS CORRECT
            - NOTHING HAPPENS IF THE CURRENT SELECTION IS INCORRECT
    */
    function updateScore(newAnswer: string, correctAnswer: string, index: number): void {
        const previousAnswer: (string | null) = selectedAnswers[`question${index}` as keyof typeof selectedAnswers]
        const isPreviousAnswerCorrect = previousAnswer === correctAnswer
        if(previousAnswer) {
            newAnswer === correctAnswer ? addAPoint() : removeAPoint(isPreviousAnswerCorrect)
        } else if((!previousAnswer) && (newAnswer === correctAnswer)) {
            addAPoint()
        }
    }

    // ADDS A POINT TO THE USER'S SCORE
    function addAPoint(): void {
        setScore((prevScore: number)=> prevScore + 1)
    }

    // DEDUCTS A POINT FROM THE USER'S SCORE
    function removeAPoint(isPreviousSelectionCorrect: boolean): void {
        if(isPreviousSelectionCorrect) {
            setScore(prevScore=> prevScore - 1)
        }
    }

    // DISPLAYS AN ERROR MESSAGE IF ALL QUESTIONS HAVE NOT BEEN ANSWERED
    // RENDERS QUIZ RESULT BY SETTING 'isResult' TO TRUE WHEN ALL QUESTIONS HAVE BEEN ANSWERED
    function endQuiz(e: FormEvent): void {
        e.preventDefault()
        const selectedAnswersArr: (string | null)[] = Object.values(selectedAnswers)
        
        if(selectedAnswersArr.includes(null)) {
            setDialog( {['textContent']: 'Please answer all questions.', ['isOpen']: true} )
        } else {
            setIsResult(true)
        }
    }

    // RENDERS THE HERO COMPONENT BY SETTING 'isHomePage' TO TRUE
    // SETS 'isLoading' TO TRUE TO ENSURE THAT REQUIRED DATA HAS BEEN FETCHED SUCCESSFULLY BEFORE DISPLAYING THE HERO COMPONENT
    function gotoHomePage(): void {
        window.scroll(0, 0)
        setLoading(true)
        setIsHomePage(true)
    }

    // HIDES THE RESULT MODAL, THEN RENDERS THE QUIZ SOLUTION
    function showSolution(): void {
        setIsResult(false)
        setIsSolution(true)
    }

    // REDUCES THE SIZE OF THE QUIZ GRADIENT BACKGROUND WHEN THE APP'S THEME IS DARK
    const gradientStyles: {backgroundSize: string} = {
        backgroundSize: isDarkTheme ? '70%' : 'cover',
    } 

    const quizContextValues: TquizContext = {score, isResult, isSolution, gotoHomePage, showSolution, setIsResult, selectedAnswers, setSelectedAnswers, updateScore}
    
    // RETURNS A FORM WITH QUIZ DETAILS, QUESTIONS AND ANSWERS
    return ( 
            <quizContext.Provider value={quizContextValues}>                              
                <div className="quiz-wrapper">
                    <form className="quiz-form" onSubmit={endQuiz}>
                            <QuizDetails />
                            <Question />

                            {/* SHOWS THE USER'S SCORE AND TRY AGAIN BTN IF THE QUIZ SOLUTION IS BEING DISPLAYED.
                                SHOWS THE END QUIZ BUTTON IF THE QUIZ IS ONGOING.*/}
                            {isSolution ?
                                <div className="solution-score-cntr">
                                    <p className={`solution-score ${isDarkTheme && 'solution-score-dark'}`}>Your score: {score}/5</p>
                                    <button className="btn-group-1 try-again-btn" type="button" onClick={gotoHomePage}>Try Again</button>
                                </div>
                            :   <button className="btn-group-1 end-quiz-btn" type="submit">End Quiz</button>
                            }
                    </form>

                    {/* DISPLAYS QUIZ RESULT WHEN 'isResult' IS TRUE */}
                    {isResult && <Result /> }

                    {/* GRADIENT BACKGROUND */}
                    <div className="gradient gradient-quiz" style={gradientStyles}></div>
                </div>
            </quizContext.Provider>
    )
}