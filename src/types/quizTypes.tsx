import { FormEvent, KeyboardEvent } from 'react'

export type TSelectedAnswers = {
    question1: string | null;
    question2: string | null;
    question3: string | null;
    question4: string | null;
    question5: string | null;
}

export type TquizContext = {
    score: number;
    isResult: boolean;
    isSolution: boolean;
    gotoHomePage: ()=> void;
    showSolution: ()=> void;
    setIsResult: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAnswers: TSelectedAnswers;
    setSelectedAnswers: React.Dispatch<React.SetStateAction<TSelectedAnswers>>;
    updateScore: (newAnswer: string, correctAnswer: string, index: number)=> void;
}

export type TTimeSpent = {
    secondsSpent: string;
    minutesSpent: string;
}

export type TQuestion = {
    category: string;
    correct_answer : string;
    difficulty : string;
    incorrect_answers : [string, string, string];
    question : string;
    type : string;
}

export type TQuestionsToRender = {
    question: string;
    answers: string[];
    correctAnswer: string;
}[]

export type TSelectAnswer = (event: KeyboardEvent | FormEvent, index: number, correctAnswer: string)=> void;

export type TAnswersProp = {
    answers: string[],
    correctAnswer: string;
    questionIndex: number;
}