import { useEffect, useState } from "react"
import CategoryOption from "./CategoryOption"
import Option from "../utils/Option"

export default function Hero(props) {
    const {theme, startQuiz} = props
    const isDarkTheme = theme === 'dark'
    const [selectedOption, setSelectedOption] = useState({
      category: 'Random',
      difficulty: 'Random',
      type: 'Random'
    })
    const options = {
      difficulty: ['Random', 'Easy', 'Medium', 'Hard'],
      type: ['Random', 'Multiple Choice', 'True / False']
  }

    function handleSelectionChange(e) {
      const optionRadioInput = e.target
      setSelectedOption(prevSelection=> {
        return {...prevSelection, [optionRadioInput.name]: optionRadioInput.dataset.option}
      })
    }
 
    return (
        <div className='hero-wrapper'>
        <section className='left-col'>
          
          <h2>Dive into the ultimate <span className='trivia'>trivia</span> experience with <span className='quizzical'>Quizzical</span>.</h2>
          <p className='hero-subtext'>Let the quest for knowledge begin!</p>

          <form className='quiz-info-cntr' onSubmit={startQuiz}>
            
            <div className='options-wrapper category-options'>
              <button 
                id='category'
                className={`info-trigger category-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`} 
                type="button"
                aria-haspopup='listbox' 
                aria-expanded='false' 
                aria-controls='category-dropdown'>

                <span id='category-trigger-name' className="category-trigger-name trigger-name">Category</span> 
                <span id='category-trigger-arrow' className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>

              </button>

              <ul id='category-dropdown' className={`hidden info-dropdown ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='category-trigger-name'>
                <CategoryOption 
                  selectedOption={selectedOption} 
                  handleSelectionChange={handleSelectionChange}
                />
              </ul>
            </div>

            <div className='options-wrapper difficulty-options'>
              <button 
                id='difficulty'
                className={`info-trigger difficulty-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`}
                type="button"
                aria-haspopup='listbox'
                aria-expanded='false'
                aria-controls='difficulty-dropdown'>

                <span id='difficulty-trigger-name' className="difficulty-trigger-name trigger-name">Difficulty</span> 
                <span id='difficulty-trigger-arrow' className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>

              </button>
              
            <ul id='difficulty-dropdown' className={`hidden info-dropdown  ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='difficulty-trigger-name'>
                <Option 
                  options={options.difficulty} 
                  name="difficulty" 
                  selectedOption={selectedOption} 
                  handleSelectionChange={handleSelectionChange}
                />
            </ul>
            </div>

            <div className='options-wrapper type-options'>

              <button 
                id='type' 
                className={`info-trigger type-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`}
                type="button"
                aria-haspopup='listbox' 
                aria-expanded='false' 
                aria-controls='type-dropdown'>

                <span id='type-trigger-name' className="type-trigger-name trigger-name">Type</span> 
                <span id='type-trigger-arrow' className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>
              </button>

              <ul id='type-dropdown' className={`hidden info-dropdown  ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='type-trigger-name'>
                <Option 
                  options={options.type} 
                  name="type" 
                  selectedOption={selectedOption}
                  handleSelectionChange={handleSelectionChange} 
                />
              </ul>
            </div>

            <button className='start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`right-col ${isDarkTheme && 'right-col-dark'}`}></div>
      </div>
    )
}