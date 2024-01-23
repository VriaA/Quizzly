// HIDES OR SHOWS THE LOADER IF THE 'loading' STATE IS SET TO TRUE
// ADDS OR REMOVES THE 'loader-cntr-dark' CLASS BASED ON THE APP'S THEME
export default function manageLoader(loading, theme) {
    const loader = document.getElementById('loader-cntr')
    loader.style.display = loading ? 'flex' : 'none'

    if(theme === 'dark') {
      loader.classList.add('loader-cntr-dark')
    } else {
      loader.classList.remove('loader-cntr-dark')
    }
}