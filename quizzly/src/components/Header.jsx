export default function Header(props) {
    const {theme, changeTheme} = props
    const isDarktheme = theme === 'dark'
    return (
        <header>
            <a className={`logo ${isDarktheme && 'logo-dark'}`} href="/" aria-label="Quizzly logo" title="Quizzly Home"><h1>Quizzly</h1></a>
            
            <button aria-label="Change theme"
                className={`change-theme-btn ${theme === 'dark' && 'button-dark'}`}
                onClick={changeTheme}>
                <span id="theme-icon" className={`theme-icon ${isDarktheme && 'theme-icon-dark'} material-symbols-outlined`} aria-hidden='true'>
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
                <span className="sr-only" aria-live='assertive'>{theme === 'dark' ? 'Theme changed to dark' : 'Theme changed to light'}</span>
            </button>
        </header>
    )
}