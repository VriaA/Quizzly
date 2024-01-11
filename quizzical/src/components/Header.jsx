export default function Header(props) {
    const {theme, changeTheme} = props
    return (
        <header>
            <h1>Quizzical</h1>
            
            <button aria-label="Change theme"
                className={`change-theme-btn ${theme === 'dark' && 'button-dark'}`}
                onClick={changeTheme}>
                <span id="theme-icon" className='theme-icon material-symbols-outlined'>
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
                <span aria-live="polite" aria-label={theme === 'dark' ? 'Theme changed to dark' : 'Theme changed to light'}></span>
            </button>
        </header>
    )
}