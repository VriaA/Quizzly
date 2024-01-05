import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import handleStartQuizBtnClick from './utils/handleStartQuizBtnClick'

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
    const optionsWrappers = document.querySelectorAll('.options-wrapper')

    document.addEventListener('click', event=> {
      optionsWrappers.forEach(wrapper=> {
        const isClickOutside = !wrapper.contains(event.target)
        const dropdownMenu = wrapper.querySelector('.info-dropdown')
        
        if((dropdownMenu.classList.contains('hidden')) || (!isClickOutside)) return
        const trigger = wrapper.querySelector('.info-trigger')
        const arrow = wrapper.querySelector('.expand-arrow')

        toggleOptionsVisiblity(trigger, dropdownMenu, arrow)
      })
    })
  }, [])

  const changeTheme = _=> setTheme(prevTheme=> prevTheme === 'light' ? 'dark' : 'light')
  const startQuiz = (e)=> handleStartQuizBtnClick(e, setLoading)

  function handleTriggerClick(event) {
    const dropdownMenu = document.getElementById(`${event.currentTarget.id}-dropdown`)
    const triggerArrow = document.getElementById(`${event.currentTarget.id}-trigger-arrow`)
    toggleOptionsVisiblity(event.currentTarget, dropdownMenu, triggerArrow)
  }

  function toggleOptionsVisiblity(trigger, dropdownMenu, arrow) {
    dropdownMenu.classList.toggle('hidden')
    focusFirstOption(dropdownMenu)
    trigger.setAttribute('aria-expanded', trigger.ariaExpanded === 'true' ? 'false' : 'true')
    arrow.classList.toggle('rotate-arrow')
  }

  function focusFirstOption(dropdown) {
    if(dropdown.classList.contains('hidden')) return
    dropdown.children.item(0).focus()
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
