export default function Dialog(props) {
    const {dialog, setDialog} = props

    function closeDialogModal() {
        setDialog(prev=> ({...prev, ['isOpen']: false}))
    }

    return (
            <dialog id="dialog-modal" className="dialog-modal">
                <p>{dialog.textContent}</p>
                <button 
                    className="close-dialog-modal-btn" 
                    type="button"
                    onClick={closeDialogModal}
                >Close</button>
            </dialog>
            )
}