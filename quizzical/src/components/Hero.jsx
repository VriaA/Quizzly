import { useEffect, useState } from "react"
import OptionDropdownMenu from "./OptionDropDownMenu"
import CategoryOption from "./CategoryOption"
import Option from "./Option"

export default function Hero(props) {
    const {theme, startQuiz} = props
    const isDarkTheme = theme === 'dark'
    const [selectedOption, setSelectedOption] = useState({
      category: 'Random',
      difficulty: 'Random',
      type: 'Random'
    })

    const [isOpen, setIsOpen] = useState({
      categoryDropdown: false,
      difficultyDropdown: false,
      typeDropdown: false
    })

    useEffect(()=>{
      document.addEventListener('click', e=> {
        const optionsWrappers = document.querySelectorAll('.options-wrapper')

        optionsWrappers.forEach(wrapper=> {
          const isWrapperClicked = wrapper.contains(e.target)
          const optionsDropdownMenu = wrapper.querySelector('.info-dropdown')
          const isDropdownHidden = optionsDropdownMenu.classList.contains('hidden')

          if(!isWrapperClicked && !isDropdownHidden) {
            setIsOpen(prev=> {
              return {...prev, [`${optionsDropdownMenu.id.split('-')[0]}Dropdown`]: !prev[`${optionsDropdownMenu.id.split('-')[0]}Dropdown`]}
            })
          }
        })
      })
    }, [])
 
    return (
        <div className='hero-wrapper'>
        <section className='left-col'>
          
          <h2>Dive into the ultimate <span className='trivia'>trivia</span> experience with <span className='quizzical'>Quizzical</span>.</h2>
          <p className='hero-subtext'>Let the quest for knowledge begin!</p>

          <form className='quiz-info-cntr' onSubmit={startQuiz}>

            <OptionDropdownMenu 
              menuName={'category'} 
              MenuOptions={CategoryOption} 
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isDarkTheme={isDarkTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <OptionDropdownMenu 
              menuName={'difficulty'} 
              MenuOptions={Option} 
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isDarkTheme={isDarkTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <OptionDropdownMenu 
              menuName={'type'} 
              MenuOptions={Option} 
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isDarkTheme={isDarkTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <button className='start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`right-col ${isDarkTheme && 'right-col-dark'}`}></div>
      </div>
    )
}