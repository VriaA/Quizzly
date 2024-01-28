import switchEffect from '../assets/music/light_switch.mp3'

export default function Header(props) {
    const switchToggleSound = new Audio(`${switchEffect}`)
    const {isDarkTheme, setTheme, theme} = props

    /* CHANGES APP THEME WHEN CALLED, SAVES THE NEW THEME TO LOCAL STORAGE
     AND PLAYS A SWITCH TOGGLE SOUND EFFECT */
    function changeTheme () {
        switchToggleSound.play()
        setTheme(prevTheme=> prevTheme === 'light' ? 'dark' : 'light')
        localStorage.setItem('theme', JSON.stringify(theme === 'dark' ? 'light' : 'dark'))
        switchToggleSound.currentTime = 0
      }

    return (
        <header>
            <a className={`logo ${isDarkTheme && 'logo-dark'}`} href="/" aria-label="Quizzly logo" title="Quizzly Home"><h1>Quizzly</h1></a>
            
            {/* CALLS 'changeTheme' ON CLICK */}
            <button aria-label="Change app theme"
                className={`change-theme-btn ${isDarkTheme && 'button-dark'}`}
                onClick={changeTheme}>
                <span id="theme-icon" className={`theme-icon ${isDarkTheme && 'theme-icon-dark'} material-symbols-outlined`} aria-hidden='true'>
                    {isDarkTheme ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
            <span className="sr-only" aria-live='assertive'>{isDarkTheme ? 'Theme changed to dark' : 'Theme changed to light'}</span>
        </header>
    )
}