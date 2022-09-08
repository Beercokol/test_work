import React from 'react'
import './modal.css'

interface IModalProps {
    displayModal: boolean
    closeModal(): void
    children?: React.ReactNode
}
export const Modal: React.FC<IModalProps> = ({
    displayModal,
    closeModal,
    children,
}) => {
    const divStyle = {
        display: displayModal ? 'block' : 'none',
    }
    const closeIntoModal = (e: any): void => {
        e.stopPropagation()
        closeModal()
    }
    return (
        <div className="modal" onClick={closeIntoModal} style={divStyle}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="close"
                    onClick={closeIntoModal}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}
