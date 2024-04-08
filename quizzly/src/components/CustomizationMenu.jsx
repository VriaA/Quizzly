import { useContext, useEffect } from "react"
import quizCustomizationOptions from "../data/quizCustomizationOptions"
import { appContext } from "../App"

export default function CustomizationMenu(props) {
      const {menuName, MenuOptions, isOpen, setIsOpen} = props
      const { isDarkTheme, selectedOption, setSelectedOption } = useContext(appContext)
      /* FOCUSES ON THE CHECKED RADIO BUTTON WHEN A DROPDOWN MENU IS OPEN.
        ENSURES THAT OPTIONS CAN BE NAVIGATED USING ARROW KEYS.*/
      useEffect(()=> {
        const dropdown = document.getElementById(`${menuName}-dropdown`)

        if(dropdown.classList.contains('hidden')) return
            const checkedRadiobtn = dropdown.querySelector('input[type=radio]:checked')
            checkedRadiobtn.focus()
      }, [isOpen])

      // CHANGES THE TRIGGER NAME OF DROPDOWN MENU TO THE SELECTED OPTION TO MIMIC THE DEFAULT <select> ELEMENT EFFECT
      useEffect(()=> {
        const triggerName = document.getElementById(`${menuName}-menu-trigger-name`)
        triggerName.textContent = selectedOption[menuName]
      }, [selectedOption])

      // SAVES A SELECTED OPTION IN STATE
      function handleSelectionChange(e) {
        const optionRadioInput = e.target
        setSelectedOption(prevSelection=> {
          return {...prevSelection, [optionRadioInput.name]: optionRadioInput.dataset.option}
        })
      }

      //OPENS OR CLOSES A MENU WHEN ITS TRIGGER IS CLICKED
      function handleTriggerClick() {
        setIsOpen(prev=> {
          return {...prev, [`${menuName}Dropdown`]: !prev[`${menuName}Dropdown`]}
        })
      }

      // CLOSES AN OPEN MENU WHEN THE 'Tab', 'Escape' or 'Enter' KEY IS PRESSED
      function closeDropDownOnKeyPress(e) {
        if(isOpen[`${menuName}Dropdown`] && (e.key === 'Tab' || e.key === 'Escape' || e.key === `Enter`)) {
          e.preventDefault()
          setIsOpen(prev=> {
            return {...prev, [`${menuName}Dropdown`]: !prev[`${menuName}Dropdown`]}
          })
          focusClosedMenuTrigger()
        }
      }

      // SETS FOCUS ON A MENU TRIGGER AFTER ITS ASSOCIATED MENU IS CLOSED BY A KEY PRESS.
      function focusClosedMenuTrigger() {
        const trigger = document.getElementById(`${menuName}-menu-trigger`)
        trigger.focus()
      }

      const DROPDOWN_HIDDEN_CLASS = isOpen[`${menuName}Dropdown`] ? '' : 'hidden'
      const ROTATE_TRIGGER_ARROW_CLASS = isOpen[`${menuName}Dropdown`] ? 'rotate-arrow' : ''

      return (
          <fieldset className={`customization-menu-wrapper ${menuName}-options`} onKeyDown={closeDropDownOnKeyPress}>
            
            <button 
              id={`${menuName}-menu-trigger`}
              className={`quiz-customization-menu-trigger ${menuName}-menu-trigger ${isDarkTheme && 'button-dark quiz-customization-menu-trigger-dark'}`} 
              type="button"
              aria-haspopup='true' 
              aria-expanded={isOpen[`${menuName}Dropdown`]} 
              aria-controls={`${menuName}-dropdown`}
              aria-label={`Select quiz ${menuName}`}
              onClick={handleTriggerClick}>

              <span id={`${menuName}-menu-trigger-name`} className={`${menuName}-menu-trigger-name trigger-name`}>{menuName}</span> 
              <span id={`${menuName}-menu-trigger-arrow`} className={`${ROTATE_TRIGGER_ARROW_CLASS} expand-arrow material-symbols-outlined`} aria-hidden='true'>
                expand_more
              </span>
            </button>

            <ul id={`${menuName}-dropdown`} className={`${DROPDOWN_HIDDEN_CLASS} customization-dropdown-menu ${isDarkTheme && 'customization-dropdown-menu-dark'}`} role='listbox' aria-labelledby={`${menuName}-menu-trigger-name`}>
              <MenuOptions 
                name={menuName}
                options={quizCustomizationOptions[menuName]}
                handleSelectionChange={handleSelectionChange}
              />
            </ul>
          </fieldset>
      )
}