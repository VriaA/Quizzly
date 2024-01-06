import { useEffect } from "react"
import Categories from "./Categories"
import toggleOptionMenuVisiblity from '../utils/toggleOptionMenuVisiblity'
import handleOptionsKeyUp from '../utils/handleOptionsKeyUp'

export default function Hero(props) {
    const {theme, startQuiz} = props
    const isDarkTheme = theme === 'dark'

    useEffect(()=>{
      const optionsWrappers = document.querySelectorAll('.options-wrapper')
  
      document.addEventListener('click', event=> {
        optionsWrappers.forEach(wrapper=> {
          const isClickOutside = !wrapper.contains(event.target)
          const dropdownMenu = wrapper.querySelector('.info-dropdown')
          const trigger = wrapper.querySelector('.info-trigger')
          
          if((!(trigger.ariaExpanded === 'true')) || (!isClickOutside)) return
          const arrow = wrapper.querySelector('.expand-arrow')
  
          trigger.ariaExpanded = 'false'
          arrow.classList.remove('rotate-arrow')

          if(dropdownMenu.classList.contains('hidden')) return
          dropdownMenu.classList.add('hidden')
        })
      })
    }, [])

    function handleTriggerClick(event) {
      const dropdownMenu = document.getElementById(`${event.currentTarget.id}-dropdown`)
      const triggerArrow = document.getElementById(`${event.currentTarget.id}-trigger-arrow`)
      toggleOptionMenuVisiblity(event.currentTarget, dropdownMenu, triggerArrow)
    }

    function updateTriggerName(event) {
      const triggerName = event.currentTarget.querySelector('.trigger-name')
      triggerName.textContent = event.target.dataset.option
    }
 
    return (
        <div className='hero-wrapper'>
        <section className='left-col'>
          
          <h2>Dive into the ultimate <span className='trivia'>trivia</span> experience with <span className='quizzical'>Quizzical</span>.</h2>
          <p className='hero-subtext'>Let the quest for knowledge begin!</p>

          <form className='quiz-info-cntr' onSubmit={startQuiz}>
            
            <div className='options-wrapper category-options' onKeyUp={handleOptionsKeyUp} onChange={updateTriggerName}>
              <button 
                id='category'
                className={`info-trigger category-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`} 
                type="button"
                aria-haspopup='listbox' 
                aria-expanded='false' 
                aria-controls='category-dropdown'
                onClick={(e)=> handleTriggerClick(e)}>

                <span id='category-trigger-name' className="category-trigger-name trigger-name">Category</span> 
                <span id='category-trigger-arrow' className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>

              </button>

              <Categories isDarkTheme={isDarkTheme} />
            </div>

            <div className='options-wrapper difficulty-options' onKeyUp={handleOptionsKeyUp} onChange={updateTriggerName}>
              <button 
                id='difficulty'
                className={`info-trigger difficulty-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`}
                type="button"
                aria-haspopup='listbox'
                aria-expanded='false'
                aria-controls='difficulty-dropdown'
                onClick={(e)=> handleTriggerClick(e)}>

                <span id='difficulty-trigger-name' className="difficulty-trigger-name trigger-name">Difficulty</span> 
                <span id='difficulty-trigger-arrow' className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>

              </button>
              
            <ul id='difficulty-dropdown' className={`info-dropdown hidden ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='difficulty-trigger-name'>
                <li role='option' tabIndex={0}>
                  <input id='difficulty-1' className='info-option' type='radio' name='difficulty' value={'random'} defaultChecked={true} data-option='Random'/>
                  <label htmlFor='difficulty-1' className='info-option-label'>
                    Random
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='difficulty-2' className='info-option' type='radio' name='difficulty' value={'easy'} data-option='Easy'/>
                  <label htmlFor='difficulty-2' className='info-option-label'>
                    Easy
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='difficulty-3' className='info-option' type='radio' name='difficulty' value={'medium'} data-option='Medium'/>
                  <label htmlFor='difficulty-3' className='info-option-label'>
                    Medium
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='difficulty-4' className='info-option' type='radio' name='difficulty' value={'hard'} data-option='Hard'/>
                  <label htmlFor='difficulty-4' className='info-option-label'>
                    Hard
                  </label>
                </li>
              </ul>
            </div>

            <div className='options-wrapper type-options' onKeyUp={handleOptionsKeyUp} onChange={updateTriggerName}>

              <button 
                id='type' 
                className={`info-trigger type-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`}
                type="button"
                aria-haspopup='listbox' 
                aria-expanded='false' 
                aria-controls='type-dropdown'
                onClick={(e)=> handleTriggerClick(e)}>

                <span id='type-trigger-name' className="type-trigger-name trigger-name">Type</span> 
                <span id='type-trigger-arrow' className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>
              </button>

              <ul id='type-dropdown' className={`info-dropdown hidden ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='type-trigger-name'>
                
                <li role='option' tabIndex={0}>
                  <input id='type-1' className='info-option' type='radio' name='type' value={'random'} defaultChecked={true} data-option='Random'/>
                  <label htmlFor='type-1' className='info-option-label'>
                    Random
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='type-2' className='info-option' type='radio' name='type' value={'multiple'} data-option='Multiple'/>
                  <label htmlFor='type-2' className='info-option-label'>
                    Multiple Choice
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='type-3' className='info-option' type='radio' name='type' value={'boolean'} data-option='True / False'/>
                  <label htmlFor='type-3' className='info-option-label'>
                  True / False
                  </label>
                </li>
              </ul>
            </div>

            <button className='start-quiz-btn' type='submit'>Start Quiz</button>
          </form>

        </section>

        <div className={`right-col ${isDarkTheme && 'right-col-dark'}`}></div>
      </div>
    )
}