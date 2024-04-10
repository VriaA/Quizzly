import { useContext, useEffect, useState, FormEvent } from "react"
import CustomizationMenu from "./CustomizationMenu"
import CategoryOptions from "./CategoryOptions"
import Options from "./Options"
import { handleStartQuizBtnClick } from "../utils/handleStartQuizBtnClick"
import { appContext } from "../App"
import { TAppContext } from "../types/appTypes"
import { TIsOpen } from "../types/heroTypes"

export default function Hero(): JSX.Element {
    const { isDarkTheme, setLoading, setQuestions, setIsHomePage, setDialog } = useContext(appContext) as TAppContext

    // STORES THE OPEN STATUS OF ALL QUIZ CUSTOMIZATION MENUS IN STATE
    const [isOpen, setIsOpen] = useState<TIsOpen>({
      categoryDropdown: false,
      difficultyDropdown: false,
      typeDropdown: false,
    })

    // CLOSES THE QUIZ CUSTOMIZATION DROPDOWN MENU THAT IS OPEN ON CLICK OUTSIDE
    useEffect(()=>{
      document.addEventListener('click', closeQuizCustomizationMenuOnClickOutside)
      return ():void=> document.removeEventListener('click', closeQuizCustomizationMenuOnClickOutside)
    }, [])

    function closeQuizCustomizationMenuOnClickOutside(e: MouseEvent): void {
      const customizationMenuWrappers: NodeListOf<HTMLElement> = document.querySelectorAll('.customization-menu-wrapper')

      customizationMenuWrappers.forEach((wrapper: HTMLElement)=> {
        const isWrapperClicked: boolean = wrapper.contains(e.target as Node | null)
        const customizationDropdownMenu = wrapper.querySelector('.customization-dropdown-menu') as HTMLElement
        const isDropdownHidden: boolean = customizationDropdownMenu.classList.contains('hidden')

        if(!isWrapperClicked && !isDropdownHidden) {
          const menuName: string = customizationDropdownMenu.id.split('-')[0] + 'Dropdown'
          setIsOpen((prev: TIsOpen)=> ( {...prev, [menuName]: !prev[menuName as keyof typeof prev]} ) )
        }
      })
    }

    // STARTS THE QUIZ WHEN CALLED
    const startQuiz = (e: FormEvent)=> handleStartQuizBtnClick(e, setLoading, setQuestions, setIsHomePage, setDialog)
 
    return (
        <div className='hero-wrapper'>
        <section className='hero-content'>
          
          <h2>Dive into the ultimate <span className='trivia'>trivia</span> experience with <span className='quizzly'>Quizzly</span>.</h2>
          <p className='hero-subtext'>Let the quest for knowledge begin!</p>

          <form className='quiz-customization-form' onSubmit={startQuiz}>

            {/* RENDERS QUIZ CUSTOMIZATION MENU */}
            <CustomizationMenu  menuName={'category'}  isOpen={isOpen} setIsOpen={setIsOpen}>
              <CategoryOptions />
             </CustomizationMenu> 

            <CustomizationMenu  menuName={'difficulty'}  isOpen={isOpen} setIsOpen={setIsOpen}>
              <Options menuName={'difficulty'}/>
            </CustomizationMenu> 

            <CustomizationMenu  menuName={'type'}  isOpen={isOpen} setIsOpen={setIsOpen}>
              <Options menuName={'type'}/>
            </CustomizationMenu> 

            <button className='btn-group-1 start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`hero-image ${isDarkTheme && 'hero-image-dark'}`}></div>
      </div>
    )
}