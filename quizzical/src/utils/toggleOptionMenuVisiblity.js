export default function toggleOptionMenuVisiblity(trigger, dropdownMenu, arrow) {
    dropdownMenu.classList.toggle('hidden')
    focusCheckedOption(dropdownMenu)
    trigger.setAttribute('aria-expanded', trigger.ariaExpanded === 'true' ? 'false' : 'true')
    arrow.classList.toggle('rotate-arrow')
  }

  function focusCheckedOption(dropdown) {
    if(dropdown.classList.contains('hidden')) return
      const options = [...dropdown.children]
      options.forEach(option=> {
        const hasCheckedRadioBtn = option.contains(option.querySelector('input[type=radio]:checked'))
        if(!hasCheckedRadioBtn) return 
          option.focus()
      })
  }