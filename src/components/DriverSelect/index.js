import React from 'react'
import Sheet from 'react-modal-sheet'

const DriverSelect = ({ isOpen, setOpen, ride }) => {
    console.log(ride)
    return (
        <div>
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                       <p>Driver Select</p>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    )
}

export default DriverSelect
