import switchEffect from '../assets/music/light_switch.mp3';
import { appContext } from "../App"
import { useContext } from 'react'
import { TAppContext } from '../types/appTypes'

export default function Header(): JSX.Element {
    const switchToggleSound: HTMLAudioElement = new Audio(`${switchEffect}`)
    const {isDarkTheme, setTheme} = useContext(appContext) as TAppContext

    /* CHANGES APP THEME WHEN CALLED, SAVES THE NEW THEME TO LOCAL STORAGE
     AND PLAYS A SWITCH TOGGLE SOUND EFFECT */
    function changeTheme():void {
        switchToggleSound.play()
        setTheme((prevTheme: string)=> prevTheme === 'light' ? 'dark' : 'light')
        localStorage.setItem('theme', JSON.stringify(isDarkTheme ? 'light' : 'dark'))
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