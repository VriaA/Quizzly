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
            />

            <OptionDropdownMenu 
              menuName={'difficulty'} 
              MenuOptions={Option} 
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isDarkTheme={isDarkTheme}
            />

            <OptionDropdownMenu 
              menuName={'type'} 
              MenuOptions={Option} 
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              isDarkTheme={isDarkTheme}
            />

            <button className='start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`right-col ${isDarkTheme && 'right-col-dark'}`}></div>
      </div>
    )
}