import React, { useCallback, useState } from 'react'
import './App.css'
import { TermList } from './pages/term_list'
import { TermType } from './types'
import Button from './components/button/button'
import { Modal } from './components/modal/modal'
import ModalContent from './pages/modal_content'

const App: React.FC = () => {
    const [terms, setTerms] = useState<Array<TermType>>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const logAllTerms = useCallback(() => {
        console.log('terms ---', terms)
    }, [terms])

    const closeModal = (): void => {
        setModalOpen(false)
    }

    const openModal = (): void => setModalOpen(true)

    return (
        <div className="App">
            <div className="button_container">
                <Button
                    color="normal"
                    size="big"
                    type="button"
                    text="submit form"
                    onClickHandler={logAllTerms}
                />
                <Button
                    color="normal"
                    size="big"
                    type="button"
                    text="Parse from google sheets"
                    onClickHandler={openModal}
                />
            </div>
            <TermList setTermList={setTerms} termList={terms} />
            <Modal displayModal={isModalOpen} closeModal={closeModal}>
                <ModalContent setTerms={setTerms} closeModal={closeModal} />
            </Modal>
        </div>
    )
}

export default App
