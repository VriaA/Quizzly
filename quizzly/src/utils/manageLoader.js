export default function manageLoader(loading, theme) {
    const loader = document.getElementById('loader-cntr')
    loader.style.display = loading ? 'flex' : 'none'

    if(theme === 'dark') {
      loader.classList.add('loader-cntr-dark')
    } else {
      loader.classList.remove('loader-cntr-dark')
    }
}