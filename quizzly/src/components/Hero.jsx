import { useEffect, useState } from "react"
import CustomizationMenu from "./CustomizationMenu"
import CategoryOption from "./CategoryOption"
import Option from "./Option"

export default function Hero(props) {
    const {isDarkTheme, startQuiz, loading, setLoading, selectedOption, setSelectedOption, setDialog} = props

    // STORES THE OPEN STATUS OF ALL QUIZ CUSTOMIZATION MENUS IN STATE
    const [isOpen, setIsOpen] = useState({
      categoryDropdown: false,
      difficultyDropdown: false,
      typeDropdown: false
    })

    // CLOSES THE QUIZ CUSTOMIZATION DROPDOWN MENU THAT IS OPEN ON CLICK OUTSIDE
    useEffect(()=>{
      document.addEventListener('click', closeQuizCustomizationMenuOnClickOutside)
      document.removeEventListener('click', closeQuizCustomizationMenuOnClickOutside)
    }, [])

    function closeQuizCustomizationMenuOnClickOutside(e) {
      const customizationMenuWrappers = document.querySelectorAll('.customization-menu-wrapper')

      customizationMenuWrappers.forEach(wrapper=> {
        const isWrapperClicked = wrapper.contains(e.target)
        const customizationDropdownMenu = wrapper.querySelector('.customization-dropdown-menu')
        const isDropdownHidden = customizationDropdownMenu.classList.contains('hidden')

        if(!isWrapperClicked && !isDropdownHidden) {
          setIsOpen(prev=> ( {...prev, [`${customizationDropdownMenu.id.split('-')[0]}Dropdown`]: !prev[`${customizationDropdownMenu.id.split('-')[0]}Dropdown`]} ) )
        }
      })
    }
 
    return (
        <div className='hero-wrapper'>
        <section className='hero-content'>
          
          <h2>Dive into the ultimate <span className='trivia'>trivia</span> experience with <span className='quizzly'>Quizzly</span>.</h2>
          <p className='hero-subtext'>Let the quest for knowledge begin!</p>

          <form className='quiz-customization-form' onSubmit={startQuiz}>

            {/* RENDERS QUIZ CUSTOMIZATION MENU */}
            <CustomizationMenu 
              menuName={'category'} 
              MenuOptions={CategoryOption} 
              isDarkTheme={isDarkTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              loading={loading}
              setLoading={setLoading}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setDialog={setDialog}
            />

            <CustomizationMenu 
              menuName={'difficulty'} 
              MenuOptions={Option} 
              isDarkTheme={isDarkTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />

            <CustomizationMenu 
              menuName={'type'} 
              MenuOptions={Option} 
              isDarkTheme={isDarkTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />

            <button className='btn-group-1 start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`hero-image ${isDarkTheme && 'hero-image-dark'}`}></div>
      </div>
    )
}