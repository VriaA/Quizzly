export default function Hero(props) {
    const {theme, handleTriggerClick} = props
    return (
        <div className='hero-wrapper'>
        <section className='left-col'>
          
          <h2>Dive into the ultimate <span className='trivia'>trivia</span> experience with <span className='quizzical'>Quizzical</span>.</h2>
          <p className='hero-subtext'>Let the quest for knowledge begin!</p>

          <div className='quiz-info-cntr'>
            
            <div className='selection category-options'>
              <button 
                id='category-trigger' className={`info-trigger category-trigger ${theme === 'dark' && 'button-dark info-trigger-dark'}`} 
                aria-haspopup='listbox' aria-expanded='true' aria-controls='category-dropdown'
                onClick={(e)=> handleTriggerClick(e)}>

                <span id='category-trigger-name' className="category-trigger-name">Category</span> 
                <span className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>

              </button>

              <ul id='category-dropdown' className={`info-dropdown hidden ${theme === 'dark' && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='category-trigger-name'>
                <li role='option' tabIndex={0}>
                  <input id='category-1' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-1' className='info-option-label'>
                    General Knowledge
                  </label>
                </li>
                <li role='option' tabIndex={0}>
                  <input id='category-2' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-2' className='info-option-label'>
                    Science & Nature
                  </label>
                </li>
                <li role='option' tabIndex={0}>
                  <input id='category-3' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-3' className='info-option-label'>
                    Art
                  </label>
                </li>
                <li role='option' tabIndex={0}>
                  <input id='category-4' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-4' className='info-option-label'>
                    Mythology
                  </label>
                </li>
                <li role='option' tabIndex={0}>
                  <input id='category-5' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-5' className='info-option-label'>
                    History
                  </label>
                </li>
                <li role='option' tabIndex={0}>
                  <input id='category-6' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-6' className='info-option-label'>
                    Science: Computers
                  </label>
                </li>
                <li role='option' tabIndex={0}>
                  <input id='category-7' className='info-option' type='radio' name='category'/>
                  <label htmlFor='category-7' className='info-option-label'>
                    Celebrities
                  </label>
                </li>
              </ul>
            </div>

            <div className='selection difficulty-options'>
              <button 
                id='difficulty-trigger' className={`info-trigger difficulty-trigger ${theme === 'dark' && 'button-dark info-trigger-dark'}`}
                aria-haspopup='listbox' aria-expanded='true' aria-controls='difficulty-dropdown'
                onClick={(e)=> handleTriggerClick(e)}>

                <span id='difficulty-trigger-name' className="difficulty-trigger-name">Difficulty</span> 
                <span className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>

              </button>
              
            <ul id='difficulty-dropdown' className={`info-dropdown hidden ${theme === 'dark' && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='difficulty-trigger-name'>
                <li role='option' tabIndex={0}>
                  <input id='difficulty-1' className='info-option' type='radio' name='difficulty'/>
                  <label htmlFor='difficulty-1' className='info-option-label'>
                    Random
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='difficulty-2' className='info-option' type='radio' name='difficulty'/>
                  <label htmlFor='difficulty-2' className='info-option-label'>
                    Easy
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='difficulty-3' className='info-option' type='radio' name='difficulty'/>
                  <label htmlFor='difficulty-3' className='info-option-label'>
                    Medium
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='difficulty-4' className='info-option' type='radio' name='difficulty'/>
                  <label htmlFor='difficulty-4' className='info-option-label'>
                    Hard
                  </label>
                </li>
              </ul>
            </div>

            <div className='selection type-options'>

              <button 
                id='type-trigger' className={`info-trigger type-trigger ${theme === 'dark' && 'button-dark info-trigger-dark'}`}
                aria-haspopup='listbox' aria-expanded='true' aria-controls='type-dropdown'
                onClick={(e)=> handleTriggerClick(e)}>

                <span id='type-trigger-name' className="type-trigger-name">Type</span> 
                <span className="expand-arrow material-symbols-outlined">
                  expand_more
                </span>
              </button>

              <ul id='type-dropdown' className={`info-dropdown hidden ${theme === 'dark' && 'info-dropdown-dark'}`} role='listbox' aria-labelledby='type-trigger-name'>
                
                <li role='option' tabIndex={0}>
                  <input id='type-1' className='info-option' type='radio' name='type'/>
                  <label htmlFor='type-1' className='info-option-label'>
                    Random
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='type-2' className='info-option' type='radio' name='type'/>
                  <label htmlFor='type-2' className='info-option-label'>
                    Multiple Choice
                  </label>
                </li>

                <li role='option' tabIndex={0}>
                  <input id='type-3' className='info-option' type='radio' name='type'/>
                  <label htmlFor='type-3' className='info-option-label'>
                  True / False
                  </label>
                </li>
              </ul>
            </div>

            <button className='start-quiz-btn' type='button'>Start Quiz</button>
          </div>

        </section>

        <div className={`right-col ${theme === 'dark' && 'right-col-dark'}`}></div>
      </div>
    )
}