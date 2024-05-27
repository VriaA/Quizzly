import { useState, useEffect, createContext } from 'react'
import Dialog from './components/Dialog'
import Header from './components/Header'
import Hero from './components/Hero'
import Quiz from './components/Quiz'
import manageLoader from './utils/manageLoader'
import { TDialog, TSelectedOption, TQuestions, TAppContext } from './types/appTypes'

export const appContext = createContext<TAppContext | null>(null)

export default function App() : JSX.Element {
  const savedTheme = JSON.parse(localStorage.getItem('theme') as string)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<string>(savedTheme ? savedTheme : prefersDark.matches ? 'dark' : 'light')
  const [loading, setLoading] = useState<boolean>(true)
  const [dialog, setDialog] = useState<TDialog>({
    textContent: '',
    isOpen: false
  })
  const [isHomePage, setIsHomePage] = useState<boolean>(true)
  const [questions, setQuestions] = useState<TQuestions | []>([])
  const [selectedOption, setSelectedOption] = useState<TSelectedOption>({
    category: 'Category',
    difficulty: 'Difficulty',
    type: 'Type'
  })

  // CHANGES THE APP THEME WHEN THERE IS NO SAVED THEME IN LOCAL STORAGE AND A USER CHANGES THEIR DEVICE THEME
  useEffect(()=> {
    prefersDark.addEventListener('change', (event)=> {
      if(savedTheme) return
      setTheme(event.matches ? 'dark' : 'light')
    } )
  }, [])

  /*TOGGLES THE 'body-dark' CLASS ON THE DOCUMENT'S BODY WHEN THE APP'S THEME IS CHANGED &
    SAVES THE NEW THEME TO LOCALSTORAGE SO THAT IT PERSISTS ACROSS REFRESHES */
  useEffect(()=>{
    theme === 'dark' ? document.body.classList.add('body-dark') : document.body.classList.remove('body-dark')
  }, [theme])

  // CALLS THE 'manageLoader' FUNCTION WHEN THE LOADING STATE OR APP'S THEME CHANGES
  useEffect(()=> manageLoader(loading, theme) , [loading, theme])

  // HIDES OR CLOSES THE DIALOG MODAL ANYTIME THERE IS A CHANGE IN THE 'dialog' STATE
  useEffect(()=> {
    const dialogEl = document.getElementById('dialog-modal') as HTMLDialogElement
    dialog.isOpen ? dialogEl.showModal() : dialogEl.close()
  }, [dialog])

  const appContextValues: TAppContext = {
    theme, 
    setTheme, 
    isDarkTheme: theme === 'dark', 
    loading, 
    setLoading, 
    selectedOption, 
    setSelectedOption, 
    dialog, 
    setDialog,
    questions,
    setQuestions, 
    setIsHomePage,
  } 
  
  return (
      <appContext.Provider value={appContextValues}>
        <div className='wrapper'>
          <Header />
          <main>
            {/* RENDERS THE HERO OR QUIZ COMPONENT DEPENDING ON THE 'isHomePage' STATE */}
            {isHomePage ? 
               <>
                <div className="gradient gradient-home1"></div>
                  <Hero />   
                <div className="gradient gradient-home2"></div>
              </>
              : <Quiz />
            }

            {/* USED FOR RENDERING ERROR MESSAGES OR WARNINGS */}
            <Dialog />
          </main>
        </div>
      </appContext.Provider>
  )
}