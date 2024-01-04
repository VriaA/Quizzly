export default function Header(props) {
    const {theme, changeTheme} = props
    return (
        <header>
            <h1>Quizzical</h1>
            
            <button 
                className={`change-theme-btn ${theme === 'dark' && 'button-dark'}`}
                onClick={changeTheme}>
                <span id="theme-icon" className='theme-icon material-symbols-outlined'>
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
        </header>
    )
}