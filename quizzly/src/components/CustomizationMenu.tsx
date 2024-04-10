import { useContext, useEffect, KeyboardEvent } from "react"
import { appContext } from "../App"
import { TCustomizationMenu } from "../types/heroTypes"
import { TAppContext } from "../types/appTypes"

export default function CustomizationMenu({children, menuName, isOpen, setIsOpen}: TCustomizationMenu): JSX.Element {
      const { isDarkTheme, selectedOption } = useContext(appContext) as TAppContext
      
      /* FOCUSES ON THE CHECKED RADIO BUTTON WHEN A DROPDOWN MENU IS OPEN.
        ENSURES THAT OPTIONS CAN BE NAVIGATED USING ARROW KEYS.*/
      useEffect(()=> {
        const dropdown = document.getElementById(`${menuName}-dropdown`) as HTMLElement

        if(dropdown.classList.contains('hidden')) return
            const checkedRadiobtn = dropdown.querySelector('input[type=radio]:checked') as HTMLElement
            checkedRadiobtn.focus()
      }, [isOpen])

      // CHANGES THE TRIGGER NAME OF DROPDOWN MENU TO THE SELECTED OPTION TO MIMIC THE DEFAULT <select> ELEMENT EFFECT
      useEffect(()=> {
        const triggerName = document.getElementById(`${menuName}-menu-trigger-name`) as HTMLElement
        triggerName.textContent = selectedOption[menuName as keyof typeof selectedOption]
      }, [selectedOption])

      //OPENS OR CLOSES A MENU WHEN ITS TRIGGER IS CLICKED
      function handleTriggerClick(): void {
        setIsOpen(prev=> {
          return {...prev, [`${menuName}Dropdown`]: !prev[`${menuName}Dropdown` as keyof typeof prev]}
        })
      }

      // CLOSES AN OPEN MENU WHEN THE 'Tab', 'Escape' or 'Enter' KEY IS PRESSED
      function closeDropDownOnKeyPress(e: KeyboardEvent): void {
        if(isOpen[`${menuName}Dropdown` as keyof typeof isOpen] && (e.key === 'Tab' || e.key === 'Escape' || e.key === `Enter`)) {
          e.preventDefault()
          setIsOpen(prev=> {
            return {...prev, [`${menuName}Dropdown`]: !prev[`${menuName}Dropdown` as keyof typeof prev]}
          })
          focusClosedMenuTrigger()
        }
      }

      // SETS FOCUS ON A MENU TRIGGER AFTER ITS ASSOCIATED MENU IS CLOSED BY A KEY PRESS.
      function focusClosedMenuTrigger(): void {
        const trigger = document.getElementById(`${menuName}-menu-trigger`) as HTMLElement
        trigger.focus()
      }

      const DROPDOWN_HIDDEN_CLASS = isOpen[`${menuName}Dropdown` as keyof typeof isOpen] ? '' : 'hidden'
      const ROTATE_TRIGGER_ARROW_CLASS = isOpen[`${menuName}Dropdown` as keyof typeof isOpen] ? 'rotate-arrow' : ''

      return (
          <fieldset className={`customization-menu-wrapper ${menuName}-options`} onKeyDown={closeDropDownOnKeyPress}>
            
            <button 
              id={`${menuName}-menu-trigger`}
              className={`quiz-customization-menu-trigger ${menuName}-menu-trigger ${isDarkTheme && 'button-dark quiz-customization-menu-trigger-dark'}`} 
              type="button"
              aria-haspopup='true' 
              aria-expanded={isOpen[`${menuName}Dropdown` as keyof typeof isOpen]} 
              aria-controls={`${menuName}-dropdown`}
              aria-label={`Select quiz ${menuName}`}
              onClick={handleTriggerClick}>

              <span id={`${menuName}-menu-trigger-name`} className={`${menuName}-menu-trigger-name trigger-name`}>{menuName}</span> 
              <span id={`${menuName}-menu-trigger-arrow`} className={`${ROTATE_TRIGGER_ARROW_CLASS} expand-arrow material-symbols-outlined`} aria-hidden='true'>
                expand_more
              </span>
            </button>

            <ul id={`${menuName}-dropdown`} className={`${DROPDOWN_HIDDEN_CLASS} customization-dropdown-menu ${isDarkTheme && 'customization-dropdown-menu-dark'}`} role='listbox' aria-labelledby={`${menuName}-menu-trigger-name`}>
              {children}
            </ul>
          </fieldset>
      )
}