import { FormEvent } from 'react'
import { TQuestions, TDialog } from './appTypes'
import { TQuestion } from './quizTypes'
export type TIsOpen = {
    categoryDropdown: boolean,
    difficultyDropdown: boolean,
    typeDropdown: boolean
}

export type TCustomizationMenu = {
    menuName: string;
    isOpen: TIsOpen;
    children: JSX.Element;
    setIsOpen: React.Dispatch<React.SetStateAction<TIsOpen>>;
}

export type TTriviaCategories = {
    trivia_categories: TCategories
}

export type TCategories = {
    id: 'category', 
    name: 'Category'
}[]

export type ThandleStartQuizBtnClick = (e: FormEvent,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setQuestions: React.Dispatch<React.SetStateAction<TQuestions>>,
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>,
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>)=> void 

export type TgetQuestions= (
    category: FormDataEntryValue,
    difficulty: FormDataEntryValue,
    type: FormDataEntryValue,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setQuestions: React.Dispatch<React.SetStateAction<TQuestions>>,
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>,
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>)=> Promise<void>


export type TopenDBResults = [TQuestion, TQuestion, TQuestion, TQuestion, TQuestion]

export type TopenDBResponse = {
    response_code: number;
    results: TopenDBResults
}