export default function handleOptionsKeyUp(event) {
    const optionsCntr = event.currentTarget
    const dropdownMenu = optionsCntr.querySelector('.info-dropdown')
    const isDropdownMenuHidden = dropdownMenu.classList.contains('hidden')

    if(isDropdownMenuHidden) return
      hideOptionsMenuOnEscapeKeyPress(optionsCntr, dropdownMenu, event)
      focusOptionOnKeyPress(optionsCntr, event)
}

function hideOptionsMenuOnEscapeKeyPress(optionsCntr, dropdownMenu, e) {
  const trigger = optionsCntr.querySelector('.info-trigger')
  const arrow = optionsCntr.querySelector('.expand-arrow')

  if(!(e.key === 'Escape')) return
    dropdownMenu.classList.add('hidden')
    arrow.classList.remove('rotate-arrow')
    trigger.setAttribute('aria-expanded', 'false')
    trigger.focus()
}

function focusOptionOnKeyPress(optionsCntr, e) {
  const options = optionsCntr.querySelectorAll('li[role=option]')

  options.forEach((option, currentIndex)=> {

    option.addEventListener('keyup', e=> {
      const isFocusNext = (e.key === 'ArrowRight') || (e.key === 'ArrowDown')
      const isFocusPrevious = (e.key === 'ArrowLeft') || (e.key === 'ArrowUp')

        if(isFocusNext) {
          focusNextOptionOnKeyPress(options, currentIndex)
        } else if (isFocusPrevious) {
          focusPreviousOptionOnKeyPress(options, currentIndex)
        }
    })
  })
}

function focusNextOptionOnKeyPress(options, i) {
    const nextOption = options[i + 1]
    const firstOption = options[0]

    nextOption ? nextOption.focus() : firstOption.focus()
}

function focusPreviousOptionOnKeyPress(options, i) {
    const previousOption = options[i - 1]
    const lastOption = [...options].pop()

    previousOption ? previousOption.focus() : lastOption.focus()
}