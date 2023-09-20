import { useState } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

/* Components */
import FileInput from '../../../components/forms/FileInput';
import Modal from '../../../components/layouts/Modal';
import PrimaryButton from '../../../components/buttons/PrimaryBtn';
import SecondaryButton from '../../../components/buttons/SecondaryBtn';


/**
 * This component is a modal window that will display options how the user would like to add a new inventory item.
 */
const AddItemModal = () => {
    const navigate = useNavigate();

    // State handler for modal window
    const [isOpen, setIsOpen] = useState(false);

    // Function to close the modal window
    function handleClose() {
        setIsOpen(false);
    }

    // Function that will handle redirection to create item page
    function goToCreate() {
        navigate('/inventory/new');
        setIsOpen(false);
    }
    
    return (
        <>
            {/* Button that will trigger the modal window */}
            <PrimaryButton handleClick={() => setIsOpen(true)} textSize="text-xs sm:text-base lg:text-[1vw]">
                <PlusSmIcon className="w-5 sm:w-6 lg:w-[1.5vw] mr-1 sm:mr-2 -ml-1 sm:-ml-2 inline-flex"/>
                Add Item/s
            </PrimaryButton>

            {/* Modal Window */}
            <Modal openModal={isOpen} handleClose={handleClose} modalTitle="Add New Item/s" modalSize="max-w-lg">
                
                {/* Modal Body */}

                {/* Description */}
                <p className="font-inter text-sm sm:text-lg text-center">
                    Choose how you would like to create new item/s.
                </p>

                {/* Buttons */}
                <div className="w-full justify-center space-x-[2.25vw] sm:space-x-3 lg:space-x-4 mt-6 mb-6 inline-flex">
                    <FileInput />
                    <SecondaryButton
                        handleClick={()=>goToCreate()}
                        textSize="text-sm sm:text-lg"
                    >
                        Encode Item
                    </SecondaryButton>
                </div>
            </Modal>
        </>
    );
};


export default AddItemModal;