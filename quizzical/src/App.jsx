import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  const savedTheme = JSON.parse(localStorage.getItem('theme'))
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(savedTheme || prefersDark.matches ? 'dark' : 'light')

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

  // useEffect(async ()=>{
  //   const response = await fetch("https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple")
  //   const data = await response.json()
  //   console.log(data)
  // }, [])

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

  return (
        <div>
          <Header theme={theme} changeTheme={changeTheme} />

          <main>
            <Hero theme={theme} handleTriggerClick={handleTriggerClick}/>
          </main>
        </div>
  )
}

export default App
