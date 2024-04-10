import { useContext } from "react"
import { appContext } from "../App"
import { TDialog, TAppContext } from "../types/appTypes"

export default function Dialog(): JSX.Element {
    const {isDarkTheme, dialog, setDialog} = useContext(appContext) as TAppContext

    function closeDialogModal() {
        setDialog((prev: TDialog)=> ({...prev, ['isOpen']: false}))
    }

    return (
            <dialog id="dialog-modal" className={`dialog-modal ${isDarkTheme && 'dialog-modal-dark'}`}>
                <span className="warning-icon material-symbols-outlined">
                    warning
                </span>
                <p>{dialog.textContent}</p>

                {/* CLOSES DIALOG MODAL ON CLICK */}
                <button 
                    className="close-dialog-modal-btn" 
                    type="button"
                    onClick={closeDialogModal}
                >Dismiss</button>
            </dialog>
            )
}