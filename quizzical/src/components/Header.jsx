export default function Header(props) {
    const {theme, changeTheme} = props
    return (
        <header>
            <a className={`logo ${theme === 'dark' && 'logo-dark'}`} href="/" aria-label="Quizzical logo" title="Quizzical Home"><h1>Quizzical</h1></a>
            
            <button aria-label="Change theme"
                className={`change-theme-btn ${theme === 'dark' && 'button-dark'}`}
                onClick={changeTheme}>
                <span id="theme-icon" className='theme-icon material-symbols-outlined' aria-hidden='true'>
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
                <span className="sr-only" aria-live='assertive'>{theme === 'dark' ? 'Theme changed to dark' : 'Theme changed to light'}</span>
            </button>
        </header>
    )
}