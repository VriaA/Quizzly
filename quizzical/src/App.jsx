import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  const savedTheme = JSON.parse(localStorage.getItem('theme'))
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(savedTheme ? savedTheme : prefersDark.matches ? 'dark' : 'light')
  const [loading, setLoading] = useState(false)

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

  useEffect(()=>{
    const dropdownMenus = document.querySelectorAll('.info-dropdown')

    document.addEventListener('click', event=> {
      const clickedElement = event.target
      const triggers = document.querySelectorAll('.info-trigger')

      dropdownMenus.forEach((menu, i)=> {
        const isTriggerClicked = clickedElement === triggers[i] || clickedElement.parentElement === triggers[i]
        const isMenuHidden = menu.classList.contains('hidden')
        const isMenuClicked = menu.contains(clickedElement)

        if(!isTriggerClicked && !isMenuHidden && !isMenuClicked) {
          toggleOptionsVisiblity(triggers[i], menu)
        }
      })
    })
  }, [])

  const changeTheme = _=> setTheme(prevTheme=> prevTheme === 'light' ? 'dark' : 'light')

  function handleTriggerClick(event) {
    const menu = document.getElementById(`${event.currentTarget.id}-dropdown`)
    toggleOptionsVisiblity(event.currentTarget, menu)
  }

  function toggleOptionsVisiblity(trigger, menu) {
    menu.classList.toggle('hidden')
    trigger.setAttribute('aria-expanded', trigger.ariaExpanded === 'true' ? 'false' : 'true')
  }

  function startQuiz(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const {category, difficulty, type} = Object.fromEntries(formData)
    
    getQuestions(category, difficulty, type)
  }

  async function getQuestions(category, difficulty, type) {
      try {
        setLoading(true)
        const response = await fetch(`https://opentdb.com/api.php?amount=5${category !== 'random' ? `&category=${category}` : ''}${difficulty !== 'random' ? `&difficulty=${difficulty}` : ''}${type !== 'random' ? `&type=${type}` : ''}`)
        handleResponseError(response)

        const data = await response.json()
        handleDataError(data)
        console.log(data)
      } catch(error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
  }

  function handleResponseError(response) {
    if(!response.ok) {
      if(response.status >= 500) {
        throw new Error('Error starting quiz. Unable to connect to the server.')
      } else {
        throw new Error('Error starting quiz. Please check your internet connection and try again')
      }
    }
  }

  function handleDataError(data) {
    const RESPONSE_CODE_NO_RESULTS = 1;
    const RESPONSE_CODE_TOO_MANY_REQUESTS = 5;

    if (data.response_code === RESPONSE_CODE_NO_RESULTS) {
      throw new Error('No results found: The server returned no quiz questions.');
    } else if (data.response_code === RESPONSE_CODE_TOO_MANY_REQUESTS) {
      throw new Error('Too many requests: Please refresh the page and try again later.');
    }
  }

  return (
        <div className='wrapper'>
          <Header theme={theme} changeTheme={changeTheme} />

          <main>
            <Hero 
              theme={theme} 
              handleTriggerClick={handleTriggerClick}
              startQuiz={startQuiz}
            />
          </main>
        </div>
  )
}

export default App
