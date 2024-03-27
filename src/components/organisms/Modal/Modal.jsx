import './_modal.scss';

function Modal({ closeModal }) {
    return (
        <div>
            <h1 onClick={() => closeModal(false)}>Test</h1>
        </div>
    );
}

export default Modal;