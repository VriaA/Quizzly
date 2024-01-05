export default function handleOptionsKeyUp(event) {
    const optionsCntr = event.currentTarget
    const dropdownMenu = optionsCntr.querySelector('.info-dropdown')
    const isDropdownMenuHidden = dropdownMenu.classList.contains('hidden')

    if(isDropdownMenuHidden) return
      hideOptionsMenuOnKeyPress(optionsCntr, dropdownMenu, event)
      checkOptionOnKeyPress(optionsCntr, event)
}

function hideOptionsMenuOnKeyPress(optionsCntr, dropdownMenu, e) {
  const trigger = optionsCntr.querySelector('.info-trigger')
  const arrow = optionsCntr.querySelector('.expand-arrow')

  if(!(e.key === 'Escape' || e.key === 'Tab')) return
    dropdownMenu.classList.add('hidden')
    arrow.classList.remove('rotate-arrow')
    trigger.setAttribute('aria-expanded', 'false')
    trigger.focus()
}

function checkOptionOnKeyPress(optionsCntr) {
  const options = optionsCntr.querySelectorAll('li[role=option]')

  options.forEach((option, currentIndex)=> {

    option.addEventListener('keyup', e=> {
      const isFocusNext = (e.key === 'ArrowRight') || (e.key === 'ArrowDown')
      const isFocusPrevious = (e.key === 'ArrowLeft') || (e.key === 'ArrowUp')

        if(isFocusNext) {
          checkNextOptionOnKeyPress(options, currentIndex)
        } else if (isFocusPrevious) {
          checkPreviousOptionOnKeyPress(options, currentIndex)
        }
    })
  })
}

function checkNextOptionOnKeyPress(options, i) {
    const nextOption = options[i + 1]
    const firstOption = options[0]
    if(nextOption) {
      nextOption.focus()
      nextOption.querySelector('input[type=radio]').checked = 'true'
    } else {
      firstOption.querySelector('input[type=radio]').checked = 'true'
      firstOption.focus()
    }
    nextOption ? nextOption.focus() : firstOption.focus()
}

function checkPreviousOptionOnKeyPress(options, i) {
    const previousOption = options[i - 1]
    const lastOption = [...options].pop()

    if(previousOption) {
      previousOption.focus()
      previousOption.querySelector('input[type=radio]').checked = 'true'
    } else {
      lastOption.focus()
      lastOption.querySelector('input[type=radio]').checked = 'true'
    }
}