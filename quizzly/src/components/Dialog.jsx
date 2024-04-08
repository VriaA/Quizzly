import { useContext } from "react"
import { appContext } from "../App"

export default function Dialog() {
    const { isDarkTheme, dialog, setDialog } = useContext(appContext)

    function closeDialogModal() {
        setDialog(prev=> ({...prev, ['isOpen']: false}))
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