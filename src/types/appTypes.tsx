export type TDialog = {
    textContent: string;
    isOpen: boolean;
}

export type TQuestions = {
    category: string;
    correct_answer : string;
    difficulty : string;
    incorrect_answers : [string, string, string];
    question : string;
    type : string;
}[]

export type TSelectedOption = {
    category: string,
    difficulty: string,
    type: string
}

export type TAppContext = {
    theme: string, 
    setTheme: React.Dispatch<React.SetStateAction<string>>, 
    isDarkTheme: boolean, 
    loading: boolean, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    selectedOption: TSelectedOption, 
    setSelectedOption: React.Dispatch<React.SetStateAction<TSelectedOption>>, 
    dialog: TDialog, 
    setDialog: React.Dispatch<React.SetStateAction<TDialog>>,
    questions: TQuestions,
    setQuestions: React.Dispatch<React.SetStateAction<TQuestions>>, 
    setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>,
  }