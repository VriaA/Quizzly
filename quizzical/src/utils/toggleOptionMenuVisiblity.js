export default function toggleOptionMenuVisiblity(trigger, dropdownMenu, arrow) {
    dropdownMenu.classList.toggle('hidden')
    focusFirstOption(dropdownMenu)
    trigger.setAttribute('aria-expanded', trigger.ariaExpanded === 'true' ? 'false' : 'true')
    arrow.classList.toggle('rotate-arrow')
  }

  function focusFirstOption(dropdown) {
    if(dropdown.classList.contains('hidden')) return
    dropdown.children.item(0).focus()
  }