import quizOptions from "../data/quizOptions"

export default function OptionDropdownMenu(props) {
      const {menuName, MenuOptions, selectedOption, setSelectedOption, isDarkTheme} = props
      
      function handleSelectionChange(e) {
        const optionRadioInput = e.target
        setSelectedOption(prevSelection=> {
          return {...prevSelection, [optionRadioInput.name]: optionRadioInput.dataset.option}
        })
      }

      return (
          <div className={`options-wrapper ${menuName}-options`}>
            <button 
              id={menuName}
              className={`info-trigger ${menuName}-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`} 
              type="button"
              aria-haspopup='listbox' 
              aria-expanded='false' 
              aria-controls={`${menuName}-dropdown`}>

              <span id={`${menuName}-trigger-name`} className={`${menuName}-trigger-name trigger-name`}>{menuName}</span> 
              <span id={`${menuName}-trigger-arrow`} className="expand-arrow material-symbols-outlined">
                expand_more
              </span>

            </button>

            <ul id={`${menuName}-dropdown`} className={`hidden info-dropdown ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby={`${menuName}-trigger-name`}>
              <MenuOptions 
                name={menuName}
                options={quizOptions[menuName]}
                selectedOption={selectedOption} 
                handleSelectionChange={handleSelectionChange}
              />
            </ul>
          </div>
      )
}