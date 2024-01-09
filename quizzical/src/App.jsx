import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import handleStartQuizBtnClick from './utils/handleStartQuizBtnClick'
import Questions from './components/Questions'

function App() {
  const savedTheme = JSON.parse(localStorage.getItem('theme'))
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(savedTheme ? savedTheme : prefersDark.matches ? 'dark' : 'light')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isHomePage, setIsHomePage] = useState(true)

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

  const changeTheme = _=> setTheme(prevTheme=> prevTheme === 'light' ? 'dark' : 'light')
  const startQuiz = (e)=> handleStartQuizBtnClick(e, setLoading, setQuestions, setIsHomePage)

  console.log(isHomePage)
  return (
        <div className='wrapper'>
          {loading &&
            <div className={`loader-cntr ${theme === 'dark' && 'loader-cntr-dark'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" strokeOpacity="1" stroke="#D02F70" strokeWidth=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
              <p className='loader-text'>Loading...</p>
            </div>}
          
          <Header theme={theme} changeTheme={changeTheme} />

          <main>
            {isHomePage ?
              <Hero 
              theme={theme} 
              startQuiz={startQuiz}
              loading={loading}
              setLoading={setLoading}
              />
              : <Questions questions={questions} />
            }
            
          </main>
        </div>
  )
}

export default App