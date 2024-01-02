export default function Header(props) {
    return (
        <header>
            <h1>Quizzical</h1>
            
            <button className='theme-icon-cntr'>
                <span className='theme-icon material-symbols-outlined'>
                    {props.theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
        </header>
    )
}