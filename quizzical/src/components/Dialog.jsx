export default function Dialog(props) {
    const {dialog, setDialog, isDarkTheme} = props

    function closeDialogModal() {
        setDialog(prev=> ({...prev, ['isOpen']: false}))
    }

    return (
            <dialog id="dialog-modal" className={`dialog-modal ${isDarkTheme && 'dialog-modal-dark'}`}>
                <span className="warning-icon material-symbols-outlined">
                    warning
                </span>
                <p>{dialog.textContent}</p>
                <button 
                    className="close-dialog-modal-btn" 
                    type="button"
                    onClick={closeDialogModal}
                >Dismiss</button>
            </dialog>
            )
}