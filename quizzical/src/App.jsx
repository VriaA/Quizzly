import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Dialog from './components/Dialog'
import handleStartQuizBtnClick from './utils/handleStartQuizBtnClick'
import Quiz from './components/Quiz'
import manageLoader from './utils/manageLoader'

function App() {
  const savedTheme = JSON.parse(localStorage.getItem('theme'))
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(savedTheme ? savedTheme : prefersDark.matches ? 'dark' : 'light')
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState({
    textContent: '',
    isOpen: false
  })
  const [questions, setQuestions] = useState([])
  const [isHomePage, setIsHomePage] = useState(true)
  const [selectedOption, setSelectedOption] = useState({
    category: 'Category',
    difficulty: 'Difficulty',
    type: 'Type'
  })

  useEffect(()=> {
    prefersDark.addEventListener('change', (event)=> {
      if(savedTheme) return
      setTheme(event.matches ? 'dark' : 'light')
    } )
  }, [])

  useEffect(()=>{
    theme === 'dark' ? document.body.classList.add('body-dark') : document.body.classList.remove('body-dark')
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  useEffect(()=> manageLoader(loading, theme) , [loading, theme])

  useEffect(()=> {
    const dialogEl = document.getElementById('dialog-modal')
    dialog.isOpen ? dialogEl.showModal() : dialogEl.close()
  }, [dialog])

  const changeTheme = _=> setTheme(prevTheme=> prevTheme === 'light' ? 'dark' : 'light')
  const startQuiz = (e)=> handleStartQuizBtnClick(e, setLoading, setQuestions, setIsHomePage)

  return (
        <div className='wrapper'>
          <Header theme={theme} changeTheme={changeTheme} />

          <main>
            {isHomePage ?
              <Hero 
                theme={theme} 
                startQuiz={startQuiz}
                loading={loading}
                setLoading={setLoading}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              : <Quiz 
                  theme={theme} 
                  questions={questions}
                  setIsHomePage={setIsHomePage}
                  selectedOption={selectedOption} 
                  setDialog={setDialog}
                />
            }

            <Dialog dialog={dialog} setDialog={setDialog} />
          </main>
        </div>
  )
}

export default App