import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import handleStartQuizBtnClick from './utils/handleStartQuizBtnClick'
import Questions from './components/Questions'
import manageLoader from './utils/manageLoader'

function App() {
  const savedTheme = JSON.parse(localStorage.getItem('theme'))
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(savedTheme ? savedTheme : prefersDark.matches ? 'dark' : 'light')
  const [loading, setLoading] = useState(true)
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
              : <Questions 
                  questions={questions}
                  setIsHomePage={setIsHomePage}
                  selectedOption={selectedOption} 
                />
            }
            
          </main>
        </div>
  )
}

export default App