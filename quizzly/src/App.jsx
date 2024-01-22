import { useState, useEffect } from 'react'
import Dialog from './components/Dialog'
import Header from './components/Header'
import Hero from './components/Hero'
import Quiz from './components/Quiz'
import handleStartQuizBtnClick from './utils/handleStartQuizBtnClick'
import manageLoader from './utils/manageLoader'

export default function App() {
  const savedTheme = JSON.parse(localStorage.getItem('theme'))
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(savedTheme ? savedTheme : prefersDark.matches ? 'dark' : 'light')
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState({
    textContent: '',
    isOpen: false
  })
  const [isHomePage, setIsHomePage] = useState(true)
  const [questions, setQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState({
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
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  // CALLS THE 'manageLoader' FUNCTION WHEN THE LOADING STATE OR APP'S THEME CHANGES
  useEffect(()=> manageLoader(loading, theme) , [loading, theme])

  // HIDES OR CLOSES THE DIALOG MODAL ANYTIME THERE IS A CHANGE IN THE 'dialog' STATE
  useEffect(()=> {
    const dialogEl = document.getElementById('dialog-modal')
    dialog.isOpen ? dialogEl.showModal() : dialogEl.close()
  }, [dialog])

  // STARTS THE QUIZ WHEN CALLED
  const startQuiz = (e)=> handleStartQuizBtnClick({e, setLoading, setQuestions, setIsHomePage, setDialog})
  
  return (
        <div className='wrapper'>
          <Header isDarkTheme={theme === 'dark'} setTheme={setTheme} />

          <main>
            {/* RENDERS THE HERO OR QUIZ COMPONENT DEPENDING ON THE 'isHomePage' STATE */}
            {isHomePage ?
              <>
                <Hero 
                  isDarkTheme={theme === 'dark'} 
                  startQuiz={startQuiz}
                  loading={loading}
                  setLoading={setLoading}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  setDialog={setDialog}
                />
                <div className="gradient gradient-home1"></div>   
                <div className="gradient gradient-home2"></div>
              </>
              : <Quiz 
                  isDarkTheme={theme === 'dark'} 
                  questions={questions}
                  setIsHomePage={setIsHomePage}
                  selectedOption={selectedOption} 
                  setDialog={setDialog}
                  setLoading={setLoading}
                  loading={loading}
                />
            }

            {/* USED FOR RENDERING ERROR MESSAGES OR WARNINGS */}
            <Dialog dialog={dialog} setDialog={setDialog} isDarkTheme={theme === 'dark'}/>
          </main>
        </div>
  )
}