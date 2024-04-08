import { useContext, useEffect, useState } from "react"
import CustomizationMenu from "./CustomizationMenu"
import CategoryOption from "./CategoryOption"
import Option from "./Option"
import handleStartQuizBtnClick from "../utils/handleStartQuizBtnClick"
import { appContext } from "../App"

export default function Hero() {
    const { isDarkTheme, setLoading, setQuestions, setIsHomePage, setDialog } = useContext(appContext)

    // STORES THE OPEN STATUS OF ALL QUIZ CUSTOMIZATION MENUS IN STATE
    const [isOpen, setIsOpen] = useState({
      categoryDropdown: false,
      difficultyDropdown: false,
      typeDropdown: false
    })

    // CLOSES THE QUIZ CUSTOMIZATION DROPDOWN MENU THAT IS OPEN ON CLICK OUTSIDE
    useEffect(()=>{
      document.addEventListener('click', closeQuizCustomizationMenuOnClickOutside)
      return ()=> document.removeEventListener('click', closeQuizCustomizationMenuOnClickOutside)
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

    // STARTS THE QUIZ WHEN CALLED
    const startQuiz = (e)=> handleStartQuizBtnClick({e, setLoading, setQuestions, setIsHomePage, setDialog})
 
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
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <CustomizationMenu 
              menuName={'difficulty'} 
              MenuOptions={Option} 
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <CustomizationMenu 
              menuName={'type'} 
              MenuOptions={Option} 
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <button className='btn-group-1 start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`hero-image ${isDarkTheme && 'hero-image-dark'}`}></div>
      </div>
    )
}