import { useEffect, useState } from "react"
import quizOptions from "../data/quizOptions"

export default function OptionDropdownMenu(props) {
      const {menuName, MenuOptions, isDarkTheme, isOpen, setIsOpen} = props
      const [clickedTriggerId, setClickedTriggerId] = useState(null)

      const [selectedOption, setSelectedOption] = useState({
        category: 'Random',
        difficulty: 'Random',
        type: 'Random'
      })

      function handleSelectionChange(e) {
        const optionRadioInput = e.target
        setSelectedOption(prevSelection=> {
          return {...prevSelection, [optionRadioInput.name]: optionRadioInput.dataset.option}
        })
      }

      function handleTriggerClick(e) {
        const triggerId = e.currentTarget.id

        setIsOpen(prev=> {
          return {...prev, [`${triggerId}Dropdown`]: !prev[`${triggerId}Dropdown`]}
        })
        setClickedTriggerId(triggerId)
      }

      function closeDropDownOnKeyPress(e) {
        if(isOpen[`${menuName}Dropdown`] && (e.key === 'Tab' || e.key === 'Escape')) {
          setIsOpen(prev=> {
            return {...prev, [`${menuName}Dropdown`]: !prev[`${menuName}Dropdown`]}
          })
        }
      }

      useEffect(()=> {
        if(clickedTriggerId) {
          const dropdown = document.getElementById(`${clickedTriggerId}-dropdown`)

          if(dropdown.classList.contains('hidden')) return
            const checkedRadiobtn = dropdown.querySelector('input[type=radio]:checked')
            checkedRadiobtn.focus()
        }
      }, [isOpen])

      const DROPDOWN_HIDDEN_CLASS = isOpen[`${menuName}Dropdown`] ? '' : 'hidden'
      const ROTATE_TRIGGER_ARROW_CLASS = isOpen[`${menuName}Dropdown`] ? 'rotate-arrow' : ''

      return (
          <div className={`options-wrapper ${menuName}-options`} onKeyDown={closeDropDownOnKeyPress}>
            
            <button 
              id={menuName}
              className={`info-trigger ${menuName}-trigger ${isDarkTheme && 'button-dark info-trigger-dark'}`} 
              type="button"
              aria-haspopup='listbox' 
              aria-expanded={isOpen[`${menuName}Dropdown`]} 
              aria-controls={`${menuName}-dropdown`}
              onClick={handleTriggerClick}>

              <span id={`${menuName}-trigger-name`} className={`${menuName}-trigger-name trigger-name`}>{menuName}</span> 
              <span id={`${menuName}-trigger-arrow`} className={`${ROTATE_TRIGGER_ARROW_CLASS} expand-arrow material-symbols-outlined`}>
                expand_more
              </span>
            </button>

            <ul id={`${menuName}-dropdown`} className={`${DROPDOWN_HIDDEN_CLASS} info-dropdown ${isDarkTheme && 'info-dropdown-dark'}`} role='listbox' aria-labelledby={`${menuName}-trigger-name`}>
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