import React, { useCallback, useState } from 'react'
import { TermType } from '../types'
import Term from '../components/term/term'
import { v4 as uuidv4 } from 'uuid'
import './modal_content.css'
import Button from '../components/button/button'
type ModalContentProps = {
    setTerms: React.Dispatch<React.SetStateAction<Array<TermType>>>
    closeModal(): void
}

export const ModalContent: React.FC<ModalContentProps> = ({
    setTerms,
    closeModal,
}) => {
    const [savedTerms, setSavedTerms] = useState<TermType[]>([])

    const createTermsUsingBufferText = (text: string): void => {
        const termsArray = text
            .split('\n')
            .map((str) => ({
                nameValue: str.split('\t')[0] || '',
                definitionValue: str.split('\t')[1] || '',
            }))
            .map(({ nameValue, definitionValue }) => ({
                id: uuidv4(),
                nameValue,
                definitionValue,
            }))

        setSavedTerms(termsArray)
    }

    const deleteTerm = useCallback(
        (termId: string): void => {
            setSavedTerms((prev) => prev.filter(({ id }) => id !== termId))
        },
        [savedTerms]
    )

    const handleKeyDown = (event: any): any => {
        event.preventDefault()
        const charCode = String.fromCharCode(event.which).toLowerCase()
        if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
            navigator.clipboard.readText().then((text) => {
                createTermsUsingBufferText(text)
            })
            event.preventDefault()
        }
    }

    const addToList = (): void => {
        setTerms((prev) => [...prev, ...savedTerms])
        closeModal()
    }

    return (
        <div>
            <h1>Para</h1>
            <Button
                color="normal"
                size="big"
                type="button"
                text="add to form"
                onClickHandler={addToList}
            />
            <div
                onKeyDown={handleKeyDown}
                className="save_block"
                contentEditable={true}
            />
            {savedTerms.map(({ id, nameValue, definitionValue }) => (
                <Term
                    key={id}
                    changeInputValue={console.log}
                    onDelete={deleteTerm}
                    id={id}
                    nameValue={nameValue}
                    definitionValue={definitionValue}
                />
            ))}
        </div>
    )
}
